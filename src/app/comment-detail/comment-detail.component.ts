import { Component, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { LikeService } from '../services/like.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MyResponse } from '../types/response.type';
import { Location } from '@angular/common';


@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css','../post-detail/post-detail.component.css', '../feed/feed.component.css', '../app.component.css']
})
export class CommentDetailComponent implements OnInit {
  id: string | null| undefined;
  comment: any;
  isLiked = false;
  addComment = false;
  isMessageClicked = false;
  defaultImagePath: string = 'http://localhost:3000/images/avatar/default.jpg';

  constructor(
    private commentService: CommentService,
    private likeService: LikeService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id'),
    this.commentService.getCommentById(this.id).subscribe({
      next: (response: MyResponse) => {
        this.comment = response.data
      },
      error: (error) => {
        if (error.status == 401) {
          this.redirectLogin();
        }
        else {
          console.log(error);
        }
      },
    })
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

  redirectCommentDetail(commentId: string) {
    this.router.navigate([`/comment/${commentId}`]);
  }

  redirectUserDetail(userId: string) {
    this.router.navigate([`/user/${userId}`]);
  }

  redirectLogin() {
    this.router.navigate(['login']);
  }

  getCommentDate(postDate: string) {
    const date = new Date(postDate);

    return date.toLocaleString();
  };
}

