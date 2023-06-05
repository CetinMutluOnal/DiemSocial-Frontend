import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommentService } from '../services/comment.service';
import { MyResponse } from '../types/response.type';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css', '../app.component.css']
})
export class NewCommentComponent implements OnInit{

  form: FormGroup;
  @Input()postId: any = '';
  constructor(public fb: FormBuilder,private commentService: CommentService,  private el:ElementRef ) {
    this.form = this.fb.group({
      content:[''],
      media:[null]
    });
  }

  ngOnInit() {
  }

  submitForm() {
    let media: any | HTMLInputElement = this.el.nativeElement.querySelector('#media');
    var formData: FormData = new FormData();
    formData.append("content",this.form.value.content);
    if (this.form.value.media != null) {
      formData.append("media",media?.files?.item(0));
    }


    this.commentService.createComment(this.postId,formData).subscribe({
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


}
