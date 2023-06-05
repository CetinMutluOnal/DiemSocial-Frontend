import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LikeService } from '../services/like.service';
import { MyResponse } from '../types/response.type';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css','../post-detail/post-detail.component.css', '../feed/feed.component.css', '../app.component.css']
})
export class CommentComponent implements OnInit{
  @Input() comments: any;
  isLiked = false;
  defaultImagePath: string = 'http://localhost:3000/images/avatar/default.jpg';
  constructor(
    private router: Router,
    private likeService: LikeService,
  ){}

  ngOnInit() {

  }

  redirectCommentDetail(commentId: string) {
    this.router.navigate([`/comment/${commentId}`]);
  }

  getPostDate(postDate: string) {
    const date = new Date(postDate);

    return date.toLocaleString();
  };

  likePost(postId:string) {
    this.likeService.createLike(postId).subscribe({
      next: (response: MyResponse) => this.isLiked = true,
      error: (error) => console.log(error),
    })
  }
}
