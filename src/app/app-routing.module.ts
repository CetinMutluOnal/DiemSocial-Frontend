import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FeedComponent } from './feed/feed.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AuthGuard } from './guard/auth.guard';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';
import { MessageComponent } from './message/message.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';

const routes: Routes = [
  {path: '', redirectTo: '/login',pathMatch: 'full'},
  {path: 'admin-user', component: UsersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'feed', component: FeedComponent,
  canActivate: [AuthGuard],
},
{path: 'message', component: MessageComponent,
  canActivate: [AuthGuard],
},
  {path: 'post', children: [
    {path: ':id', component: PostDetailComponent}
  ]},
  {path: 'user', children: [
    {path: ':username', component: UserDetailComponent}
  ]},
  {path: 'comment', children: [
    {path: ':id', component: CommentDetailComponent}
  ]},
  {path: 'admin', component: AdminComponent,
  canActivate: [AuthGuard],
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
