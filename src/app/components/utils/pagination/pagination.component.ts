import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, AfterViewInit, OnChanges {
  // Total number of items
  // pageSize

  @Input() totalItems: number = 0;
  @Input() pageSize: number = 0;

  @Output() changePage = new EventEmitter<any>();

  currentPage = 1;
  lastPage = 0;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.lastPage = Math.ceil(this.totalItems / this.pageSize);
  }

  ngAfterViewInit(): void {}

  goToPage(pageNumber: number) {
    console.log(this.lastPage);

    if (pageNumber > this.lastPage) return;

    let obj = {
      startIndex: this.pageSize * (pageNumber - 1),
      endIndex:
        this.pageSize * pageNumber > this.totalItems
          ? this.totalItems
          : this.pageSize * pageNumber,
    };
    this.currentPage = pageNumber;
    this.changePage.emit(obj);
  }

  PageNums() {
    if (!this.lastPage) return [];
    return Array(this.lastPage)
      .fill(0)
      .map((x, i) => i + 1);
  }

  ngOnInit(): void {
    console.log(this.totalItems);
    console.log(this.pageSize);
  }
}
