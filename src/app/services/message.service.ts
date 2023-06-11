import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagePath = 'http://localhost:3000/message';

  constructor(private httpClient: HttpClient) { }

  sendMessage(userId:string, data: any):Observable<any> {
    return this.httpClient.post(`${this.messagePath}/${userId}`,data, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      }),
    });
  };

  getMessagedUsers(): Observable<any>{
    return this.httpClient.get(`${this.messagePath}/find`, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      }),
    });
  };

  getMessages(userId: string): Observable<any>{
    return this.httpClient.get(`${this.messagePath}/find/${userId}`, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      }),
    });
  };
}
