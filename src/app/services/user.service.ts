import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyResponse } from '../types/response.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private UserUrl = "http://localhost:3000/user";

  constructor(private httpClient: HttpClient) { }

  getAllUsers():Observable<any> {
    return this.httpClient.get(this.UserUrl);
  }

  getUserById(userId: string): Observable<any> {
    return this.httpClient.get(`${this.UserUrl}/id/${userId}`);
  }

  getUserByUsername(username: string | null): Observable<any> {
    return this.httpClient.get(`${this.UserUrl}/${username}`);
  }

  deleteUserById(userId: string):Observable<any> {
    return this.httpClient.delete(`${this.UserUrl}/${userId}`);
  }

}
