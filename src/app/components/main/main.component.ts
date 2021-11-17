import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private readonly _service: AppService) {}
  users: User[] = [];
  usersDisplay: User[] = [];
  searchString: string = '';

  displayStartIndex: number = 0;
  displayEndIndex: number = 10;

  columns = [
    { type: 'select', title: '', className: 'w-0 px-2' },
    { type: 'text', title: 'User', className: 'sm:hidden' },
    { type: 'text', title: 'Name', className: 'hidden sm:table-cell' },
    { type: 'text', title: 'Email', className: 'hidden sm:table-cell' },
    { type: 'text', title: 'Role' },
    { type: 'text', title: '' },
  ];

  ngOnInit(): void {
    this._service.getUsers().subscribe((res) => {
      this.users = res.map((user) => {
        user.editForm = new FormGroup({
          name: new FormControl(user.name, [Validators.required]),
          email: new FormControl(user.email, [Validators.required]),
          role: new FormControl(user.role, [Validators.required]),
        });
        return user;
      });
      this.searchStr('');
    });
  }

  searchStr(e: string) {
    this.usersDisplay = this.users.filter((user) => {
      let query = e.toLocaleLowerCase();
      if (query == '') return true;
      if (
        user.email.toLocaleLowerCase().includes(query) ||
        user.name.toLocaleLowerCase().includes(query) ||
        user.role.toLocaleLowerCase().includes(query)
      ) {
        return true;
      }
      return false;
    });
  }

  isAllSelected() {
    return this.usersDisplay.every((user) => user.selected == true);
  }

  deleteSelected() {
    let selected = this.usersDisplay.filter((user) => user.selected == true);
    selected.forEach((sel) => {
      this.deleteUser(sel.id);
    });
  }

  deleteUser(id: string) {
    let index = this.users.findIndex((user) => user.id == id);
    this.users.splice(index, 1);
    this.searchStr(this.searchString);
  }

  SelectAll(e: any) {
    if (e.target.checked) {
      this.Paginate(this.usersDisplay).forEach((user) => {
        user.selected = true;
      });
    } else {
      this.users.forEach((user) => {
        user.selected = false;
      });
    }
  }

  saveChanges(user: User) {
    const index = this.users.findIndex((u) => u.id == user.id);
    this.users[index] = {
      ...this.users[index],
      ...user.editForm.value,
      editing: false,
    };
    // user = { ...user, ...user.editForm.value, editing: false };
    this.searchStr(this.searchString);
  }

  getControl(user: User, control: string) {
    return user.editForm.get(control);
  }

  Paginate(users: User[]): User[] {
    return users.slice(this.displayStartIndex, this.displayEndIndex);
  }

  changePage(e: { startIndex: number; endIndex: number }) {
    this.displayStartIndex = e.startIndex;
    this.displayEndIndex = e.endIndex;
  }
}
