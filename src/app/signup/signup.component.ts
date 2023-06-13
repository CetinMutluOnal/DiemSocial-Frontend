import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css','../app.component.css']
})
export class SignupComponent implements OnInit{
  form: FormGroup;
  constructor(
    public fb: FormBuilder,
    private httpClient: HttpClient,
    private authService: AuthService,
    private el: ElementRef,
    private router: Router,

    ) {
    this.form = this.fb.group({
      name:[''],
      username:[''],
      email:[''],
      password: [''],
      avatar: [null],
    });

  }
  ngOnInit() {}

  uploadImage(event:any ) {
  // let avatar: HTMLInputElement = this.el.nativeElement.querySelector('#avatar');
  // let form: FormData = new FormData();
  // this.form.patchValue({
  //   avatar: avatar?.item(0),
  // });
  // this.form.value.avatar.updateValueAndValidity();
  }


  submitForm() {
    let avatar: any | HTMLInputElement = this.el.nativeElement.querySelector('#avatar');
    var formData: FormData = new FormData();
    formData.append("name",this.form.value.name);
    formData.append("username",this.form.value.username);
    formData.append("email",this.form.value.email);
    formData.append("password",this.form.value.password);
    formData.append("avatar", avatar?.files?.item(0) );



    this.authService.signUp(formData).subscribe({
      next: (response) => this.router.navigate(['login']),
      error: (error) => console.log(error.message, formData),
    });


  }


}
