import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserSpaceViewModel } from '../../models/userspaceviewmodel';
import { User } from '../../models/user';
import { NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-user-edituserinfo',
  templateUrl: './user-edituserinfo.component.html',
  styleUrls: ['./user-edituserinfo.component.css']
})
export class UserEdituserinfoComponent implements OnInit {
  validateForm: FormGroup;
  isVisible: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  userSpaceViewModel: UserSpaceViewModel = new UserSpaceViewModel();
  avatarPath: string = "http://localhost:5000/uploadimg/avatar/";

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      nickname: [ null, [ Validators.required ] ],
    });
    this.userSpaceViewModel.userInfo = new User();
    this.userSpaceViewModel.userInfo.userId = JSON.parse(localStorage.getItem("currentUser")).userId;
    this.userSpaceViewModel.userInfo.avatar = JSON.parse(localStorage.getItem("currentUser")).avatar;
    this.avatarPath += this.userSpaceViewModel.userInfo.avatar;
    this.validateForm.controls["nickname"].setValue(JSON.parse(localStorage.getItem("currentUser")).nickName);
  }

  // 确认
  handleOk(){
    this.userSpaceViewModel.userInfo.avatar = this.croppedImage;
    this.avatarPath = this.croppedImage;
    this.isVisible = false;
  }

  // 取消更换头像
  handleCancel(){
    this.isVisible = false;
  }

  // 弹出窗口
  showModal(){
    this.isVisible = true;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  loadImageFailed() {
    this.createMessage("error", "加载图片失败");
    return;
  }

  saveUserData(){
    this.userSpaceViewModel.userInfo = new User();
    const localUser = JSON.parse(localStorage.getItem("currentUser"));
    this.userSpaceViewModel.userInfo.userId = localUser.userId;
    if(this.croppedImage){
      this.userSpaceViewModel.userInfo.avatar = this.croppedImage;
    }else{
      this.userSpaceViewModel.userInfo.avatar = localUser.avatar
    }
    this.userSpaceViewModel.userInfo.nickName = this.validateForm.get("nickname").value;
    this.userService.changeUserInfo(this.userSpaceViewModel.userInfo).subscribe(
      res => {
        if(res.mark === "1"){
          this.userService.getUserInfo(this.userSpaceViewModel.userInfo.userId);
          this.createMessage("success", "修改成功");
        }else{
          this.createMessage("error", res.msg);
        }
      },
      error => {
        this.createMessage("error", error.message);
      }
    );
  }

  // 弹出提示框
  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
}
