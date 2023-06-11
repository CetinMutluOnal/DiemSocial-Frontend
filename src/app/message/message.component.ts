import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { MyResponse } from '../types/response.type';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: [ '../app.component.css','./message.component.css',]
})
export class MessageComponent implements OnInit {
  authenticatedUser: any;
  users: any;
  user:any;
  messages: any;
  form: FormGroup;
  defaultImagePath: string = 'http://localhost:3000/images/avatar/default.jpg';
  messageDetail = false;
  @Input() newMessageUserId:any;
  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    public fb: FormBuilder,
    private el:ElementRef,

    ) {
      this.form = this.fb.group({
        content:[''],
        media:[null]
      });
    }

  ngOnInit(): void {
      if (this.newMessageUserId != null) {
        this.users.push(this.newMessageUserId);
      };

      this.authService.getAuthenticatedUser().subscribe({
        next: (response:any) => this.authenticatedUser = response?.userId,
        error: (error) => console.log(error),
      });

      this.messageService.getMessagedUsers().subscribe({
        next: (response: MyResponse) => {
          this.users = response.data,
           console.log(response.data)
          },
        error: (error) => console.log(error),
      });
  }

  getMessages(userId: string) {
    this.messageDetail = true;
    this.user = userId;
    this.messageService.getMessages(userId).subscribe({
      next: (response: MyResponse) => {
        this.messages = response.data,
         console.log(response.data)
        },
        error: (error) => console.log(error),
    });
  }

  submitForm(userId: string) {
    let media: any | HTMLInputElement = this.el.nativeElement.querySelector('#media');
    var formData: FormData = new FormData();
    formData.append("content",this.form.value.content);
    if (this.form.value.media != null) {
      formData.append("media",media?.files?.item(0));
    }


    this.messageService.sendMessage(userId,formData).subscribe({
      next: (response: MyResponse) => alert(response.message),
      error: (error) => alert(error.message),
    });
    this.clearForm();
  }

  clearForm(){
    this.form.reset({
      content: '',
      media: '',
    });
  }

  getPostDate(postDate: string) {
    const date = new Date(postDate);

    return date.toLocaleString();
  };

}
