import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService implements OnInit {

  private feedUrl = 'http://localhost:3000/post/follows';
  constructor(private httpClient: HttpClient) { }
  ngOnInit(): Observable<any>{
  return this.createFeed();
}

  createFeed() {
    return this.httpClient.get(this.feedUrl, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      })
    });
  }

}
