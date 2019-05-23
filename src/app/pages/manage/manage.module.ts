import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-manage/user-list/user-list.component';
import { UserEditComponent } from './user-manage/user-edit/user-edit.component';
import { UserAddComponent } from './user-manage/user-add/user-add.component';
import { PostListComponent } from './post-manage/post-list/post-list.component';
import { RoleListComponent } from './role-manage/role-list/role-list.component';
import { RoleEditComponent } from './role-manage/role-edit/role-edit.component';
import { RoleAddComponent } from './role-manage/role-add/role-add.component';
import { PermissionListComponent } from './permission-manage/permission-list/permission-list.component';
import { PermissionEditComponent } from './permission-manage/permission-edit/permission-edit.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ManageRoutes } from './manage.route';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirstcategoryListComponent } from './category-manage/firstcategory-list/firstcategory-list.component';
import { FirstcategoryAddComponent } from './category-manage/firstcategory-add/firstcategory-add.component';
import { FirstcategoryEditComponent } from './category-manage/firstcategory-edit/firstcategory-edit.component';
import { SecondcategoryListComponent } from './category-manage/secondcategory-list/secondcategory-list.component';
import { SecondcategoryAddComponent } from './category-manage/secondcategory-add/secondcategory-add.component';
import { SecondcategoryEditComponent } from './category-manage/secondcategory-edit/secondcategory-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UserListComponent
    , UserEditComponent
    , UserAddComponent
    , PostListComponent
    , RoleListComponent
    , RoleEditComponent
    , RoleAddComponent
    , PermissionListComponent
    , PermissionEditComponent
    , HomeComponent
    , FirstcategoryListComponent
    , FirstcategoryAddComponent
    , FirstcategoryEditComponent
    , SecondcategoryListComponent
    , SecondcategoryAddComponent
    , SecondcategoryEditComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(ManageRoutes)
  ]
})
export class ManageModule { }
