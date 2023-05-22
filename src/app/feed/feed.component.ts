import { Component, OnInit } from '@angular/core';
import { FeedService } from '../services/feed.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDetailComponent } from '../post-detail/post-detail.component';
import { LikeService } from '../services/like.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css', '../app.component.css']
})
export class FeedComponent implements OnInit {
  userId: string[] = [];
  follows: Array<object> | any = [];
  isLiked = false;
  defaultImagePath: string = 'http://localhost:3000/images/avatar/default.jpg';


  constructor(
    private feedService: FeedService,
    private authService:AuthService,
    private likeService: LikeService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.authService.startRefreshTokenTimer()
      this.feedService.ngOnInit().subscribe({
        next: (response) => {
          const posts: any = response;
          this.follows = posts?.follows;
        } ,
        error: (error) => console.log(error),
      });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.authService.removeTokens(),
      error: (error) => console.log(error),
    });
    this.router.navigate(['/login']);
    this.authService.stopRefreshTokenTimer();
  }

  redirectPostDetail(postId: string) {
    this.router.navigate([`/post/${postId}`]);
  }

  redirectUserDetail(username: string) {
    this.router.navigate([`/user/${username}`]);
  }

  likePost(postId:string) {
    this.likeService.createLike(postId).subscribe({
      next: (response) => this.isLiked = true,
      error: (error) => console.log(error),
    })
  }


}
