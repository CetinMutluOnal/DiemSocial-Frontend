import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService implements OnInit {

  private feedUrl = 'http://localhost:3000/post/follows';
  constructor(private httpClient: HttpClient) { }
  ngOnInit() {
  return this.createFeed(localStorage.getItem('accessToken'));
}

  createFeed(accessToken: string | null) {
    return this.httpClient.get(this.feedUrl, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + accessToken,
      })
    });
  }

}
