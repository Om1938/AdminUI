import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private readonly _http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    );
  }
}
