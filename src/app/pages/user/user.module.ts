import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSpaceComponent } from './user-space/user-space.component';
import { RouterModule } from '@angular/router';
import { UserRoutes } from './user.routes';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { UserEdituserinfoComponent } from './user-edituserinfo/user-edituserinfo.component';
import { UserPostlistComponent } from './user-postlist/user-postlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ActiveuserComponent } from './activeuser/activeuser.component';

@NgModule({
  declarations: [UserSpaceComponent, UserEdituserinfoComponent, UserPostlistComponent, UserRegisterComponent, ChangepasswordComponent, ActiveuserComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule,
    RouterModule.forChild(UserRoutes)
  ]
})
export class UserModule { }
