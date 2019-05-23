import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostViewModel } from '../../models/postviewmodel';
import { User } from '../../models/user';
import { UserSpaceViewModel } from '../../models/userspaceviewmodel';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-user-postlist',
  templateUrl: './user-postlist.component.html',
  styleUrls: ['./user-postlist.component.css']
})
export class UserPostlistComponent implements OnInit {
  private post: Post;
  private postViewModel: PostViewModel = new PostViewModel();
  private userInfo: User = new User();
  private userSpaceViewModel: UserSpaceViewModel = new UserSpaceViewModel();
  private currentPage: number = 1;
  private pageSize: number = 20;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userSpaceViewModel.userInfo = this.userInfo;
    this.userInfo.userId = this.activatedRoute.snapshot.params["userId"];
    this.userService.isLogin(this.userInfo.userId).subscribe(
      res => {
        this.userSpaceViewModel.isLogin = res.mark;
        this.loadData();
      },
      error => {
        
      }
    );
  }

  loadData(){
    this.getPostData(this.currentPage);
  }

  getPostData(currPage: number){
    this.userService.getPostsByUser(this.userInfo.userId, currPage, this.pageSize).subscribe(
      res => {
        this.postViewModel = res;
      },
      error => {
        
      }
    );
  }

  deletePostInfo(postInfo: Post){
    this.userService.deletePostInfo(postInfo).subscribe(
      res => {
        this.getPostData(this.currentPage);
      }
    );
  }
  
  pageIndexChange($event: number){
    this.currentPage = $event;
    this.getPostData($event);
  }
}
