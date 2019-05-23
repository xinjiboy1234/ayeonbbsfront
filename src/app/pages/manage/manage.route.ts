import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-manage/user-list/user-list.component';
import { PostListComponent } from './post-manage/post-list/post-list.component';
import { RoleListComponent } from './role-manage/role-list/role-list.component';
import { PermissionListComponent } from './permission-manage/permission-list/permission-list.component';
import { UserEditComponent } from './user-manage/user-edit/user-edit.component';
import { UserAddComponent } from './user-manage/user-add/user-add.component';
import { FirstcategoryListComponent } from './category-manage/firstcategory-list/firstcategory-list.component';
import { FirstcategoryEditComponent } from './category-manage/firstcategory-edit/firstcategory-edit.component';
import { FirstcategoryAddComponent } from './category-manage/firstcategory-add/firstcategory-add.component';
import { SecondcategoryListComponent } from './category-manage/secondcategory-list/secondcategory-list.component';
import { SecondcategoryEditComponent } from './category-manage/secondcategory-edit/secondcategory-edit.component';
import { SecondcategoryAddComponent } from './category-manage/secondcategory-add/secondcategory-add.component';

export const ManageRoutes = [
    {
        path:'', component:HomeComponent,
        children: [
            {path: '', redirectTo: 'post/post-list', pathMatch: 'full' },
            {path: 'user/user-list', component: UserListComponent },
            {path: 'user/user-edit/:userId', component: UserEditComponent },
            {path: 'user/user-add', component: UserAddComponent },
            {path: 'post/post-list', component:  PostListComponent},
            {path: 'role/role-list', component:  RoleListComponent},
            {path: 'permission/permission-list', component:  PermissionListComponent},
            {path: 'category/firstcategory-list', component:  FirstcategoryListComponent},
            {path: 'category/firstcategory-edit', component:  FirstcategoryEditComponent},
            {path: 'category/firstcategory-add', component:  FirstcategoryAddComponent},
            {path: 'category/secondcategory-list', component:  SecondcategoryListComponent},
            {path: 'category/secondcategory-edit', component:  SecondcategoryEditComponent},
            {path: 'category/secondcategory-add', component:  SecondcategoryAddComponent},
        ]
    },
]