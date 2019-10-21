import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    const userData: User = {
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password
    };
    return this.http.post(this.rootUrl + '/api/users/', userData);
  }

  loginUser(user: User): Observable<any> {
    const userData = {
      username: user.username,
      password: user.password
    };
    return this.http.post(this.rootUrl + '/api/auth/', userData);
  }
}
