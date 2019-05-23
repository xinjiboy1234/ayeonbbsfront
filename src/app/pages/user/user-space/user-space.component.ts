import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostViewModel } from '../../models/postviewmodel';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router'
import { User } from '../../models/user';
import { UserSpaceViewModel } from '../../models/userspaceviewmodel';

@Component({
  selector: 'app-user-space',
  templateUrl: './user-space.component.html',
  styleUrls: ['./user-space.component.css']
})
export class UserSpaceComponent implements OnInit {
  private userInfo: User;
  private userSpaceViewModel: UserSpaceViewModel;
  baseUrl: string = "http://localhost:5000/uploadimg/avatar/";
  // baseUrl: string = "http://localhost:5000/uploadimg/avatar/";
  avatarPath: string = ""

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userInfo = new User();
    this.userSpaceViewModel = new UserSpaceViewModel();
    this.userSpaceViewModel.userInfo = this.userInfo;
    this.userInfo.userId = this.activatedRoute.snapshot.params["userId"];
    this.loadData();
  }

  loadData(){
    this.getUserData();
  }

  getUserData(){
    this.userService.getUserSpaceData(this.userInfo.userId).subscribe(
      res => {
        this.userSpaceViewModel = res;
        this.avatarPath = this.baseUrl+this.userSpaceViewModel.userInfo.avatar;
      },
      error => {

      }
    );
  }
}
