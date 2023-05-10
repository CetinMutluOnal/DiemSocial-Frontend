import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private PostPath = 'http://localhost:3000/post/'
  constructor(private httpClient: HttpClient) { }

  createPost(data: any) {
    return this.httpClient.post(this.PostPath,data, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      })
    });
  }
}
