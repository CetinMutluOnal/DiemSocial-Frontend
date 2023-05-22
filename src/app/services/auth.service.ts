import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../types/token.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = "http://localhost:3000/auth";
  private refreshTokenInterval: any;

  constructor(private httpClient: HttpClient) { }


  signUp(data: any) {
    return this.httpClient.post(`${this.authUrl}/signup`,data);
  }

  signIn(data: any) {
    return this.httpClient.post(`${this.authUrl}/login`, data);
  }
  getAuthenticatedUser(){
    return this.httpClient.get(`${this.authUrl}/profile`, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      })
    })
  }

  logout() {
    return this.httpClient.get(`${this.authUrl}/logout`, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      })
    })
  }

  refresh() {
    return this.httpClient.get(`${this.authUrl}/refresh`, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('refreshToken'),
      })
    });
  }

  async startRefreshTokenTimer() {
    const refreshTokenIntervalTime = 13 * 60 * 1000

    this.refreshTokenInterval = setInterval(() => {
      this.refresh().subscribe({
        next: (response) => this.setTokens(response),
        error: (error) => console.log(error)
      })
    }, refreshTokenIntervalTime);
  }

  stopRefreshTokenTimer() {
    clearInterval(this.refreshTokenInterval);
  }

  setTokens(response:any): Boolean {
    try {
      localStorage.setItem('accessToken', response.access_token);
      localStorage.setItem('refreshToken', response.refresh_token);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  removeTokens(): Boolean {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
