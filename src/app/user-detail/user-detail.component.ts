import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{
  username: string | null | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    ) {}

    ngOnInit() {
      this.username = this.activatedRoute.snapshot.paramMap.get('username');
      this.userService.getUserByUsername(this.username).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
    }
}
