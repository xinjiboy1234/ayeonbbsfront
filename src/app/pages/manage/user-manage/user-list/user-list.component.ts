import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserManageViewModel } from 'src/app/pages/models/usermanageviewmodel';
import { UsermanageService } from 'src/app/pages/service/usermanage.service';
import { User } from 'src/app/pages/models/user';
import { RequestUserViewModel } from 'src/app/pages/models/manage.request.userviewmodel';
import { PageViewModel } from 'src/app/pages/models/pageviewmodel';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  validateForm: FormGroup;
  userManageViewModel: UserManageViewModel = new UserManageViewModel();
  reqUserInfo: RequestUserViewModel = new RequestUserViewModel();
  isLoading: boolean = false;
  currpageIndex: number;
  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  displayData: Array<RequestUserViewModel> = [];
  operating = false;
  indeterminate = false;

  constructor(
      private fb: FormBuilder,
      private userManageService: UsermanageService
    ) {}

  ngOnInit() {
    this.reqUserInfo.pageViewModel = new PageViewModel(1, 10);
    this.userManageViewModel.users = [];
    this.reqUserInfo.userIds = []
    this.validateForm = this.fb.group({
      nickName: [ null, [] ],
      userStatus: [ null, [] ],
    });
    this.getUserInfos();
  }

  currentPageDataChange($event: Array<RequestUserViewModel>): void {
    this.displayData = $event;
  }

  refreshStatus(): void {
    const allChecked = this.displayData.every(value => value.checked === true);
    const allUnChecked = this.displayData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.checkedNumber = this.userManageViewModel.users.filter(value => value.checked).length;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  getUserInfos(){
    this.isLoading = true;
    this.userManageService.getUserInfos(this.reqUserInfo).subscribe(
      res => {
        this.userManageViewModel = res;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  pageIndexChange($event: number){
    this.reqUserInfo = new RequestUserViewModel();
    if(this.validateForm.get("nickName").value){
      this.reqUserInfo.nickName = this.validateForm.get("nickName").value;
    }
    if(this.validateForm.get("userStatus").value){
      this.reqUserInfo.status = this.validateForm.get("userStatus").value;
    }
    this.reqUserInfo.pageViewModel = new PageViewModel($event, 10);
    this.getUserInfos();
  }
  
  // 查询方法
  inQuery(){
    this.pageIndexChange(1);
  }

  // 删除用户
  deleteUser(userInfo: User){
    this.userManageService.deleteUser(userInfo).subscribe(
      res => {
        if(res.mark ==="1"){
          this.pageIndexChange(this.currpageIndex);
        }
      },
      error => {

      }
    );
  }

  // 恢复用户
  recoveryUserStatus(userInfo: User){
    this.userManageService.recoveryUserStatus(userInfo).subscribe(
      res => {
        if(res.mark ==="1"){
          this.pageIndexChange(this.currpageIndex);
        }
      },
      error => {

      }
    );
  }

  // 批量删除用户
  multyDeleteUser(){
    this.reqUserInfo.userIds = []
    this.userManageViewModel.users.forEach(e => {
      if (e.checked){
        this.reqUserInfo.userIds.push(e.userId);
      }
    });
    this.userManageService.multyDeleteUser(this.reqUserInfo).subscribe(
      res => {
        if(res.mark === "1"){
          this.pageIndexChange(this.currpageIndex);
        }
      },
      error => {

      }
    );
  }
}
