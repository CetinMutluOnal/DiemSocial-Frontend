import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FeedComponent } from './feed/feed.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'feed', component: FeedComponent},
  {path: 'post', children: [
    {path: ':id', component: PostDetailComponent}
  ]},
  {path: 'user', children: [
    {path: ':id', component: UserDetailComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
