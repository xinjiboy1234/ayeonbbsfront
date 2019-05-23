import { Component, OnInit } from '@angular/core';
import { UsermanageService } from '../../service/usermanage.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userInfo: User;
  isManager: boolean = false;
  baseUrl: string = "http://localhost:5000/uploadimg/avatar/";
  avatarPath: string = ""

  constructor(
    private userManageService: UsermanageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("currentUser"));
    this.avatarPath = this.baseUrl + this.userInfo.avatar;
    this.userManageService.isSupperManager(this.userInfo.userId).subscribe(
      res => {
        this.isManager = res;
      }
    );
  }

  logout(){
    this.userManageService.doLogout();
    this.router.navigateByUrl("/");
  }
}
