import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule} from '@angular/forms';
import { FeedComponent } from './feed/feed.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';
import { CommentComponent } from './comment/comment.component';
import { NewCommentComponent } from './new-comment/new-comment.component';
import { LikeComponent } from './like/like.component';
import { FollowComponent } from './follow/follow.component';
import { MessageComponent } from './message/message.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { PostsComponent } from './admin/posts/posts.component';
import { CommentsComponent } from './admin/comments/comments.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    FeedComponent,
    NavbarComponent,
    NewPostComponent,
    PostDetailComponent,
    UserDetailComponent,
    CommentDetailComponent,
    CommentComponent,
    NewCommentComponent,
    LikeComponent,
    FollowComponent,
    MessageComponent,
    MyProfileComponent,
    AdminComponent,
    UsersComponent,
    PostsComponent,
    CommentsComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
