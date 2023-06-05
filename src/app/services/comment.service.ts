import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
private commentUrl = 'http://localhost:3000/comment';
  constructor(
    private httpClient: HttpClient,
  ) { }

  createComment(postId: string, data: any): Observable<any> {
    return this.httpClient.post(`${this.commentUrl}/${postId}`,data, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      }),
    })
  }

  getPostComments(postId: string): Observable<any> {
    return this.httpClient.get(`${this.commentUrl}/post/${postId}`);
  }

  getCommentById(commentId: string |null):Observable<any> {
    return this.httpClient.get(`${this.commentUrl}/${commentId}`);
  }
}
