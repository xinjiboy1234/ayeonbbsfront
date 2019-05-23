import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../../models/user';
import { Observable, Observer } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  validateForm: FormGroup;
  userInfo: User = new User();
  isSpinning = false;

  constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private modalService: NzModalService,
      private router: Router
    ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      loginId: [ '', [ Validators.required ], [ this.userNameValidator,  this.userNameAsyncValidator ] ],
      password: [ '', [ Validators.required ], [this.passwordValidator] ],
      checkPassword: [ '', [ this.confirmationValidator ] ],
      nickName: [ '', [ Validators.required ], [ this.nickNameValidator ] ],
      email: [ '', [Validators.required, Validators.email ], [ this.emailValidator ] ]
    });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    // Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
    setTimeout(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  // 验证用户名格式
  userNameValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      const regex: RegExp = /^[a-zA-Z]\w{5,17}$/;
      setTimeout(() => {
        if (!regex.test(control.value)) {
          observer.next({ error: true, regexError: true });
        }else{
          observer.next(null);
        }
        observer.complete();
      });
    });

  // 验证密码
  passwordValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value == null || control.value == "" || control.value.length < 6) {
          observer.next({ error: true, passwordLenError: true });
        }else{
          observer.next(null);
        }
        observer.complete();
      });
    });

  // 验证昵称是否存在
  nickNameValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      let user = new User();
      user.nickName = control.value;
      this.userService.isNickNameExist(user).subscribe(
        res => {
          if(res==true){
            observer.next({ error: true, nickNameExist: true });
          }else{
            observer.next(null);
          }
          observer.complete();
        }
      );
    });
  
  // 验证邮箱是否存在
  emailValidator = (control: FormControl) =>
  new Observable((observer: Observer<ValidationErrors | null>) => {
    let user = new User();
    user.email = control.value;
    this.userService.isEmailNameExist(user).subscribe(
      res => {
        if(res==true){
          observer.next({ error: true, emailExist: true });
        }else{
          observer.next(null);
        }
        observer.complete();
      }
    );
  });

  // 验证用户名是否存在
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      this.userService.isUserNameExist(control.value).subscribe(
        res => {
          if(res==true){
            observer.next({ error: true, exist: true });
          }else{
            observer.next(null);
          }
          observer.complete();
        }
      );
    });
  
  // 保存数据
  saveData(){
    if(this.validateForm.valid){
      this.userInfo.loginId = this.validateForm.controls["loginId"].value;
      this.userInfo.password = this.validateForm.controls["password"].value;
      this.userInfo.email = this.validateForm.controls["email"].value;
      this.userInfo.nickName = this.validateForm.controls["nickName"].value;
      this.isSpinning = true;
      this.userService.userRegiste(this.userInfo).subscribe(
        res => {
          if(res.mark === "1"){
            this.success("注册成功！,激活地址已发送至邮箱");
          }else{
            this.error(res.msg);
          }
          this.isSpinning = false;
        },
        error => {
          this.error(error.message);
          this.isSpinning = false;
        }
      );
    }
  }

  // 注册成功
  success(msg: string): void {
    this.modalService.success({
      nzTitle: '系统提示',
      nzContent: msg,
      nzOnOk:() => {
        // 跳转 本人的主页
        //this.router.navigateByUrl("main/user/space/"+JSON.parse(localStorage.getItem("currentUser")).userId);
        this.router.navigateByUrl("/");
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
