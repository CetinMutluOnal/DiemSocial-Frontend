import { Component, Input, OnInit } from '@angular/core';
import { LikeService } from '../services/like.service';
import { MyResponse } from '../types/response.type';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css', '../app.component.css']
})
export class LikeComponent implements OnInit {

  @Input()postId: any;
  isLiked: boolean = false;
  likesCount: number = 0;

  constructor(private likeService: LikeService){}

ngOnInit(): void {
  this.likeService.checkLike(this.postId).subscribe({
    next: (response: MyResponse) => {
      console.log(response.message);
      this.isLiked = true;
      this.countLikes();

    },
    error: (error) => console.log(error.message),
  });
};

buttonClick(){
  if (this.isLiked) this.dislike();
  else this.like();
}

like(){
  this.likeService.createLike(this.postId).subscribe({
    next: (response: MyResponse) => {
      console.log(response.message);
      this.isLiked = true;
      this.countLikes();
    },
    error: (error) => console.log(error.message),
  });
};

dislike(){
  this.likeService.deleteLike(this.postId).subscribe({
    next: (response: MyResponse) => {
      console.log(response.message);
      this.isLiked = false;
      this.countLikes();
    },
    error: (error) => console.log(error.message),
  });
};

countLikes(){
  this.likeService.getPostLikes(this.postId).subscribe({
    next: (response: MyResponse) => {
      console.log(response.message);
      this.likesCount = response.data.length;
    },
    error: (error) => console.log(error.message),
  });
};

}
