import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private PostPath = 'http://localhost:3000/post'
  constructor(private httpClient: HttpClient) { }

  createPost(data: any) {
    return this.httpClient.post(this.PostPath,data, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      })
    });
  }

  getPostById(postId: string | null): Observable<any>{
    return this.httpClient.get(`${this.PostPath}/detail/${postId}`)
  }
  getPostByUserId(userId: string | null): Observable<any> {
    return this.httpClient.get(`${this.PostPath}/user/${userId}`)
  }
}
