import { Component, OnInit } from '@angular/core';
import { UserService } from '../pages/user/user.service';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public userInfo: any = {};
  private isVisible: boolean = false;
  private loginId: string;
  private isSpinning: boolean = false;

  constructor(
    private userService: UserService,
    private message: NzMessageService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
  }

  doLogin(){
    // alert("loginId:" + this.userInfo.loginId+ ",password: "+this.userInfo.password);
    this.isSpinning = true;
    this.userService.userLoginService(this.userInfo).subscribe(
      data => {
        if(data != null){
          if(data.mark==1){
            history.go(-1);
          }else{
            this.message.create("error","用户名或密码错误！");
          }
          this.isSpinning = false;
        }else{
          this.message.create("error","用户名或密码错误！");
          this.isSpinning = false;
        }
      }
    );
  }

  forgetPassword(){
    this.isVisible = true;
  }

  handleOk(){
    if (this.loginId == null || this.loginId == ""){
      this.createMessage("warning", "用户名不可为空");
      return;
    }
    this.isSpinning = true;
    this.userService.forgetPassword(this.loginId).subscribe(
      res => {
        if(res.mark === "1"){
          this.isVisible = false;
          this.loginId = "";
          this.createMessage("success", "发送成功！");
        }else{
          this.createMessage("error", res.msg);
        }
        this.isSpinning = false;
      },
      error => {
        this.createMessage("success", error.message);
        this.isSpinning = false;
      }
    );
  }

  handleCancel(){
    this.isVisible = false;
  }

  // 弹出提示框
  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
}
