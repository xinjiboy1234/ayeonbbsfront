import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsermanageService } from 'src/app/pages/service/usermanage.service';
import { User } from 'src/app/pages/models/user';
import { SecondCategory } from 'src/app/pages/models/secondcategory';
import { PostManager } from 'src/app/pages/models/postmanager';
import { UserPublishCategory } from 'src/app/pages/models/userpublishcategory';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  validateForm: FormGroup;
  //权限编辑是否处于可编辑
  isPermissionEditable = false;
  user: User = new User();
  secondCategories: SecondCategory[] = [];
  

  @Input() input: any; 

  constructor(
      private fb: FormBuilder,
      private activatedRoute: ActivatedRoute,
      private userManageService: UsermanageService,
    private modalService: NzModalService,
      private router: Router
    ) {
  }

  ngOnInit(): void {
    let userId = this.activatedRoute.snapshot.params["userId"];
    this.user.userId = userId;
    this.validateForm = this.fb.group({
      nickname         : [ null, [ Validators.required ] ],
      publishCategory  : [ null, [] ],
      manageCategory   : [ null, [] ]
    });

    this.getUserInfo();
    this.getSecondCategory();
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  getUserInfo(){
    this.userManageService.getUserInfo(this.user.userId).subscribe(
      res => {
        this.validateForm.controls["nickname"].setValue(res.user.nickName);
        this.validateForm.controls["manageCategory"].setValue(res.manageCategories);
        this.validateForm.controls["publishCategory"].setValue(res.publishCategories);
      },
      error => {
        this.error("获取用户信息失败！"+error.message);
      }
    );
  }
  // 获取分类信息
  getSecondCategory(){
    this.userManageService.getSecondCategories().subscribe(
      res => {
        this.secondCategories = res;
      },
      error => {
        this.error("获取用户信息失败！"+error.message);
      }
    );
  }

  // 保存
  saveUserInfo(){
    let postManagers: PostManager[] = [];
    let userPublishCategories: UserPublishCategory[] = [];
    let userInfo = new User();
    userInfo.userId = this.user.userId;
    let manageCategories = this.validateForm.get("manageCategory").value;
    userInfo.nickName = this.validateForm.get("nickname").value;
    manageCategories.forEach(e => {
      let sc = new SecondCategory();
      let pm = new PostManager();
      pm.userInfo = this.user;
      sc.secondCategoryId = e;
      pm.secondCategory = sc;
      postManagers.push(pm);
    });
    let publishCategories = this.validateForm.get("publishCategory").value;
    publishCategories.forEach(e => {
      let sc = new SecondCategory();
      let up = new UserPublishCategory();
      up.userInfo = this.user;
      sc.secondCategoryId = e;
      up.secondCategory = sc;
      userPublishCategories.push(up);
    });
    userInfo.postManagers = postManagers;
    userInfo.userPublishCategories = userPublishCategories;
    this.userManageService.changeUserInfo(userInfo).subscribe(
      res => {
        if(res.mark === "1"){
          this.success("修改成功！");
        }else{
          this.error(res.msg);
        }
      },
      error => {
        this.error(error.message);
      }
    );
  }

  // 取消编辑
  cancelEdit(){
    this.router.navigateByUrl("/manage/user/user-list");
  }

  // 成功提示
  success(msg: string): void {
    this.modalService.success({
      nzTitle: '系统提示',
      nzContent: msg,
      nzOnOk:()=>{
        // 跳转 本人的主页
        this.router.navigateByUrl("/manage/user/user-list");
      } 
    });
  }

  // 失败提示
  error(msg: string): void {
    this.modalService.error({
      nzTitle: '系统提示',
      nzContent: msg
    });
  }
}
