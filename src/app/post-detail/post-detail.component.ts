import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Location } from '@angular/common';
import { LikeService } from '../services/like.service';
import { CommentService } from '../services/comment.service';
import { MyResponse } from '../types/response.type';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css', '../feed/feed.component.css', '../app.component.css']
})
export class PostDetailComponent implements OnInit {
  id: string | null| undefined;
  post: any;
  comments: any;
  isLiked = false;
  addComment = false;
  defaultImagePath: string = 'http://localhost:3000/images/avatar/default.jpg';
  constructor(
    private postService: PostService,
    private likeService: LikeService,
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.postService.getPostById(this.id).subscribe({
      next: (response: MyResponse) =>{
        this.post = response.data;
        console.log(this.post)
        this.getComments(this.id);
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

  async getComments(postId: any) {
    this.commentService.getPostComments(postId).subscribe({
      next: (response: MyResponse) => {
        this.comments = response.data;
        console.log('comments => ',this.comments);
      },
      error: (error) => console.log(error),
    })
  }

  redirectCommentDetail(commentId: string) {
    this.router.navigate([`/comment/${commentId}`]);
  }

  getPostDate(postDate: string) {
    const date = new Date(postDate);

    return date.toLocaleString();
  };
}
