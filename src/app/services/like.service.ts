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

  checkLike(postId: string): Observable<any>{
    return this.httpClient.get(`${this.likeUrl}/check/${postId}`,  {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      }),
    })
  }

  createLike(postId: string): Observable<any> {
   return this.httpClient.post(`${this.likeUrl}/${postId}`,null,{
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    }),
   });
  }

  deleteLike(postId: string): Observable<any> {
    return this.httpClient.delete(`${this.likeUrl}/${postId}`,{
     headers: new HttpHeaders({
       'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
     }),
    });
  }

  getPostLikes(postId: string): Observable<any> {
    return this.httpClient.get(`${this.likeUrl}/post/${postId}`);
  }

}
