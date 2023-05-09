import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../app.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
     this.form = this.fb.group({
      email:['', {
        validators: [Validators.required, Validators.email],
      }],
      password: ['',[Validators.required],
      ],
    });

  }

  submitForm() {
    var formData: FormData = new FormData();
    formData.append("email",this.form.value.email);
    formData.append("password",this.form.value.password);

    this.authService.signIn(formData).subscribe({
      next: (response) => {
        try{
          console.log(response);
          this.authService.setTokens(response)
            this.router.navigate(['/feed']);
            this.authService.startRefreshTokenTimer;
        } catch (error) {
          console.log(error);
        }

      },
      error: (error) => console.log(error.message, formData),
    });

  }


}
