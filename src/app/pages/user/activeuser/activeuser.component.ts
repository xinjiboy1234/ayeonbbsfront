import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute,Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-activeuser',
  templateUrl: './activeuser.component.html',
  styleUrls: ['./activeuser.component.css']
})
export class ActiveuserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private router: Router
  ) { }

  ngOnInit() {
    let key: string = this.activatedRoute.snapshot.queryParams["key"];
    // 替换+号
    while(key.indexOf("+")!=-1){
      key = key.replace(/\+/,"%2B")
    }
    this.userService.activeUser(key).subscribe(
      res => {
        if(res.mark === "1"){
          this.success("激活成功！");
        }else{
          this.error(res.msg);
        }
      },
      error => {
        this.error(error.message);
      }
    );
  }

  success(msg: string): void {
      this.modalService.success({
        nzTitle: '系统提示',
        nzContent: msg,
        nzOnOk:() => {
          // 跳转 本人的主页
          //this.router.navigateByUrl("main/user/space/"+JSON.parse(localStorage.getItem("currentUser")).userId);
          this.router.navigateByUrl("/login");
        } 
      });
    }

    error(msg: string): void {
      this.modalService.error({
        nzTitle: '系统提示',
        nzContent: msg
      });
    }
}
