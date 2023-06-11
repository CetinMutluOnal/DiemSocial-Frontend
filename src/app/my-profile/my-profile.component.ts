import { Component, Input, OnInit } from '@angular/core';
import { MyResponse } from '../types/response.type';
import { FollowService } from '../services/follow.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit{
  authenticatedUser:any;
  userId: any;
  follows: any[] = [];
  followers: any[] = [];
  recommendations: any[] = [];
  defaultImagePath: string = 'http://localhost:3000/images/avatar/default.jpg';
  constructor(
    private followService: FollowService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
) {}

async ngOnInit() {
  await this.createMyProfile();
  await this.getRecommendations();
}
async createMyProfile(){
  this.authService.getAuthenticatedUser().subscribe({
    next: (response: any) => {
      this.userId = response.userId;
      this.getAuthenticatedUser(this.userId);
      this.getFollowers(this.userId);
      this.getFollows(this.userId);
    },
    error: (error) => console.log(error),
  });
}
getFollows(userId: string){
  this.followService.getFollows(userId).subscribe({
    next: (response: MyResponse) => this.follows = response.data,
    error: (error) => console.log(error),
  });
}

getFollowers(userId: string){
  this.followService.getFollowers(userId).subscribe({
    next: (response: MyResponse) => this.followers = response.data,
    error: (error) => console.log(error),
  });
}

getAuthenticatedUser(userId: string){
      this.userService.getUserById(userId).subscribe({
        next: (response: MyResponse) =>{
          this.authenticatedUser = response.data;
        },
        error: (error) => console.log(error),
      });
    };

async getRecommendations(){
  this.followService.getRecommendations().subscribe({
    next: (response: MyResponse) => this.recommendations = response.data,
    error: (error) => console.log(error),
  });
}

redirectUserDetail(username: string) {
  this.router.navigate([`/user/${username}`]);
}

logout() {
  this.authService.logout().subscribe({
    next: () => this.authService.removeTokens(),
    error: (error) => console.log(error),
  });
  this.router.navigate(['/login']);
  this.authService.stopRefreshTokenTimer();
}
}
