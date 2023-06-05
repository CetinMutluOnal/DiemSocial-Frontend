import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private followPath = 'http://localhost:3000/follow';
  constructor(private httpClient: HttpClient) { }

  getFollows(userId: string): Observable<any>{
    return this.httpClient.get(`${this.followPath}/${userId}`)
  }

  getFollowers(userId: string): Observable<any>{
    return this.httpClient.get(`${this.followPath}/followers/${userId}`)
  }

  followUser(userId: string): Observable<any>{
    return this.httpClient.post(`${this.followPath}/${userId}`,null,{
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      }),
    });
  }

  unfollowUser(userId: string): Observable<any>{
    return this.httpClient.delete(`${this.followPath}/${userId}`,  {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      }),
    });
  }

  removeFollower(userId: string): Observable<any>{
    return this.httpClient.delete(`${this.followPath}/follower/${userId}`);
  }
  checkFollow(followingId: string): Observable<any>{
    return this.httpClient.get(`${this.followPath}/check/${followingId}`, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      }),
    });
  }
}
