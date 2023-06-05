import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FollowService } from '../services/follow.service';
import { MyResponse } from '../types/response.type';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {
  isFollowed:boolean = false;
  @Input() userId: any;
  constructor(
    private followService: FollowService,
    private changeDetector: ChangeDetectorRef,
    ) { }

  ngOnInit(): void {
    this.followService.checkFollow(this.userId).subscribe({
      next: (response: MyResponse) => {
        this.isFollowed = true;
      },
      error: (error) => console.log(error.message),
    })
  };

  buttonClick(){
    if (this.isFollowed) this.unFollow();
    else this.follow();
  }

  follow(){
    this.followService.followUser(this.userId).subscribe({
      next: (response: MyResponse) => {
        console.log(response.message);
        this.isFollowed = true;
      },
      error: (error) => console.log(error.message),
    });
  };

  unFollow(){
    this.followService.unfollowUser(this.userId).subscribe({
      next: (response: MyResponse) => {
        console.log(response.message);
        this.isFollowed = false;
      },
      error: (error) => console.log(error.message),
    });
  };
}
