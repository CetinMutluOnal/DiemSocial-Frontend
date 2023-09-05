import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MyResponse } from 'src/app/types/response.type';

@Component({
  selector: 'admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css',]
})
export class UsersComponent implements OnInit{
  users:any;
  defaultImagePath: string = 'http://localhost:3000/images/avatar/default.jpg';
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (response: MyResponse) => {
        this.users = response.data;
        console.log(this.users);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteUser(id:any){
    this.userService.deleteUserById(id).subscribe({
      next: (response: MyResponse) => {
        alert(response.data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

}
