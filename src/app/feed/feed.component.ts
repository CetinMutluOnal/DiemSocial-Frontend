import { Component, OnInit } from '@angular/core';
import { FeedService } from '../services/feed.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css', '../app.component.css']
})
export class FeedComponent implements OnInit {
  userId: string[] = [];
  posts: Array<object> | any = [];

  constructor(
    private feedService: FeedService,
    private authService:AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.authService.startRefreshTokenTimer()
      this.feedService.ngOnInit().subscribe({
        next: (response) => {
          const posts: any = response;
          this.posts = posts?.followedUserPost;
        } ,
        error: (error) => console.log(error),
      });
  }

  logout() {
    this.authService.logout(localStorage.getItem('accessToken')).subscribe({
      next: () => this.authService.removeTokens(),
      error: (error) => console.log(error),
    });
    this.router.navigate(['/login']);
    this.authService.stopRefreshTokenTimer();
  }


}
