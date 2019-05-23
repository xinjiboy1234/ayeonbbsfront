import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/home/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { ReplyListComponent } from './reply-list/reply-list.component';
import { RouterModule } from '@angular/router';
import { PostRoutes } from './post.routes';
import { WritePostComponent } from './write-post/write-post.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CKEditorModule } from 'ckeditor4-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PostMainComponent } from './post-main/post-main.component';
import { HotpostComponent } from './hotpost/hotpost.component';
import { PostSearchComponent } from './post-search/post-search.component';
import { PostEditComponent } from './post-edit/post-edit.component';

@NgModule({
  declarations: [PostListComponent, PostDetailComponent, ReplyListComponent, WritePostComponent, PostMainComponent ,HotpostComponent, PostSearchComponent, PostEditComponent],
  imports: [
    RouterModule.forChild(PostRoutes),
    CommonModule,
    NgZorroAntdModule,
    CKEditorModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ]
})
export class PostModule { }
