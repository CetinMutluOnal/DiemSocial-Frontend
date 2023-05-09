import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private UserUrl = "http://localhost:3000/user";

  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get(this.UserUrl);
  }

  getUserById(userId: string) {
    return this.httpClient.get(`${this.UserUrl}/${userId}`);
  }

  deleteUserById(userId: string) {
    return this.httpClient.delete(`${this.UserUrl}/${userId}`);
  }

}
