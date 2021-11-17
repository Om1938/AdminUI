import { FormGroup } from '@angular/forms';

export interface User {
  selected: boolean;
  editing: boolean;
  editForm: FormGroup;

  id: string;
  name: string;
  email: string;
  role: string;
}
