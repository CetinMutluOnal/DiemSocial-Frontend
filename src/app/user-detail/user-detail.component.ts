import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LikeService } from '../services/like.service';
import { CommentService } from '../services/comment.service';
import { Location } from '@angular/common';
import { PostService } from '../services/post.service';
import { MyResponse } from '../types/response.type';
import { FollowService } from '../services/follow.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css', '../feed/feed.component.css', '../post-detail/post-detail.component.css','../app.component.css']
})
export class UserDetailComponent implements OnInit{
  username: string | null | undefined;
  isLiked: boolean = false;
  sendMessage: boolean = false;
  posts: any;
  user: any;
  follows: any[] = [];
  followers: any[] = [];
  defaultImagePath: string = 'http://localhost:3000/images/avatar/default.jpg';
  authenticatedUser: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private likeService: LikeService,
    private postService: PostService,
    private followService: FollowService,
    private authService: AuthService,
    private location: Location,
    private router: Router,

    ) {}

    ngOnInit() {
      this.getAuthenticatedUser();
      this.username = this.activatedRoute.snapshot.paramMap.get('username');
      this.userService.getUserByUsername(this.username).subscribe({
        next: (response: MyResponse) => {
          this.user = response.data;
          this.getUserPosts(this.user[0]._id);
          this.getFollows(this.user[0]._id);
          this.getFollowers(this.user[0]._id);
        },
        error: (error) => console.log(error),
      });
        }

    returnLastPage(){
      this.location.back();
    }

    likePost(postId:string) {
      this.likeService.createLike(postId).subscribe({
        next: (response: MyResponse) => this.isLiked = true,
        error: (error) => console.log(error),
      })
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

    getUserPosts(userId: string) {
      this.postService.getPostByUserId(userId).subscribe({
        next: (response: MyResponse) => {
          this.posts = response.data?.filter((post: any) => {
            if(post.deletedAt != null) return false;
            return true;
          });
        },
        error: (error) => console.log(error),
      })
    }

    redirectPostDetail(postId: string) {
      this.router.navigate([`/post/${postId}`]);
    }

    getAuthenticatedUser() {
      this.authService.getAuthenticatedUser().subscribe({
        next: (response:any) => this.authenticatedUser = response?.userId,
        error: (error) => console.log(error),
      });
    }

    getPostDate(postDate: string) {
      const date = new Date(postDate);

      return date.toLocaleString();
    };

    deletePost(postId:string) {
      this.postService.deletePost(postId).subscribe({
        next: (response: MyResponse) => alert(response.message),
        error: (error) => console.log(error),
      });
    }
}
