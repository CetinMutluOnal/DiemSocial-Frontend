import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.httpClient.post(`${this.followPath}/${userId}`,null);
  }

  unfollowUser(userId: string): Observable<any>{
    return this.httpClient.delete(`${this.followPath}/${userId}`);
  }

  removeFollower(userId: string): Observable<any>{
    return this.httpClient.delete(`${this.followPath}/follower/${userId}`);
  }
}
