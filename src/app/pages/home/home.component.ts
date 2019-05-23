import { Component, OnInit } from '@angular/core';
import { CategoryserviceService } from './categoryservice.service';
import { FirstCategory } from '../models/firstcategory';
import { User } from '../models/user';
import { merge, Observable, Subject } from 'rxjs';
import { UserService } from '../user/user.service';
import { ActivatedRouteSnapshot, Router, ActivatedRoute, NavigationEnd, RouterState, RouterStateSnapshot } from  '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  firstCategories: FirstCategory[];
  userInfo: User = new User();
  isManager: boolean = false;
  baseUrl: string = "http://localhost:5000/uploadimg/avatar/";
  avatarPath: string = ""
  keyWord: string = "";
  public static previousUrl: string;
  
  constructor(
    private categoryService: CategoryserviceService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const token  = localStorage.getItem("token_key");
    const userStorage = localStorage.getItem("currentUser");
    this.loadData();
    if(userStorage!=null){
      this.userInfo = JSON.parse(userStorage);
      if(this.userInfo!=null){
        this.isManager = this.userInfo.isPostManager;
        this.avatarPath = this.baseUrl + this.userInfo.avatar;
      }
    }
    
    merge(this.userService.currentUser).subscribe(
      data => {
        this.userInfo = data;
        if(this.userInfo!=null){
          this.isManager = this.userInfo.isPostManager;
          this.avatarPath = this.baseUrl + this.userInfo.avatar;
        }
      }
    ); 
    if(token){ // token存在就刷新token
      this.userService.refreshToken().subscribe(
        _ => {},
        error => {
          if(error.status=="401"){
            this.userService.userLogoutService();
            this.router.navigateByUrl("/");
          }
        }
      );
    }
  }

  public loadData() {
    this.categoryService.getFirstCategories().subscribe(
      res => {
        this.firstCategories = res;
      },
      error => {
        console.log(error)
      }
    );
  }

  // 登出
  public logout(){
    this.userService.userLogoutService();
    this.router.navigateByUrl("/");
  }

  // 搜索
  doSearch(){
    if(this.keyWord.length <= 0){
      this.router.navigateByUrl("/");
    }else{
      this.router.navigateByUrl("main/post-search/" + this.keyWord + "/" + Date.parse(new Date().toString()));
    }
  }

  doLogin(){
    HomeComponent.previousUrl = this.router.url;
    this.router.navigateByUrl("/login");
  }
}
