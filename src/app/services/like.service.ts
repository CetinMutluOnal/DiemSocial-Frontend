import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private likeUrl= 'http://localhost:3000/like'
  constructor(
    private httpClient: HttpClient,
  ) { }

  createLike(postId: string): Observable<any> {
   return this.httpClient.post(`${this.likeUrl}/${postId}`,null,{
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    }),
   });
  }

}
