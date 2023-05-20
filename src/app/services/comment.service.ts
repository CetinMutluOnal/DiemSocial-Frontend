import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
private commentUrl = 'http://localhost:3000/comment/post';
  constructor(
    private httpClient: HttpClient,
  ) { }

  getPostComments(postId: string) {
    return this.httpClient.get(`${this.commentUrl}/${postId}`);
  }
}
