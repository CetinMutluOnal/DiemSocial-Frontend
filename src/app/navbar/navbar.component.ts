import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MyResponse } from '../types/response.type';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
authenticatedUser:any;
  constructor(
  private authService: AuthService,
  private userService: UserService,
  private router: Router,
) {}

async redirectMyProfile() {
  this.authService.getAuthenticatedUser().subscribe({
    next: (response: any) => {
      this.userService.getUserById(response?.userId).subscribe({
        next: (userResponse: MyResponse) =>{
          this.authenticatedUser = userResponse.data;
          this.router.navigate([`/user/${this.authenticatedUser.username}`]);
        },
        error: (error) => console.log(error),
      });
    },
    error: (error) => console.log(error),
  });
}

}
