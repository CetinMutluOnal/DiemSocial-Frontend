import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  form: FormGroup;
  constructor(public fb: FormBuilder,private postService: PostService,  private el:ElementRef ) {
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


    this.postService.createPost(formData).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error.message, formData),
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
