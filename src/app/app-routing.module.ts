import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FeedComponent } from './feed/feed.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AuthGuard } from './guard/auth.guard';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'feed', component: FeedComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
