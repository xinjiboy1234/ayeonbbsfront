import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../../models/user';
import { Observable, Observer } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordViewModel } from '../../models/passwordviewmodel';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  validateForm: FormGroup;
  userInfo: User = new User();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalService: NzModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      password: [ '', [ Validators.required ], [this.passwordValidator] ],
      oldpassword: [ '', [ Validators.required ] ],
      checkPassword: [ '', [ this.confirmationValidator ] ]
    });
  }

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

  confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  goBack(){
    history.back();
  }

  saveData(){
    if(this.validateForm.valid){
      let passwordViewModel = new PasswordViewModel();
      passwordViewModel.userId = this.activatedRoute.snapshot.params["userId"];
      passwordViewModel.oldPassword = this.validateForm.controls["oldpassword"].value;
      passwordViewModel.newPassword = this.validateForm.controls["password"].value;
      this.userService.changePassword(passwordViewModel).subscribe(
        res => {
          if(res.mark === "1"){
            this.success("变更成功");
          }else{
            this.error("变更失败");
          }
        },
        error => {
          this.error(error.message);
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
        this.router.navigateByUrl("/main/user/space/"+ JSON.parse(localStorage.getItem("currentUser")).userId);
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
