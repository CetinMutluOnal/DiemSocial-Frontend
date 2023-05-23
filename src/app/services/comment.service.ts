import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
private commentUrl = 'http://localhost:3000/comment/post';
  constructor(
    private httpClient: HttpClient,
  ) { }

  getPostComments(postId: string): Observable<any> {
    return this.httpClient.get(`${this.commentUrl}/${postId}`);
  }
}
