import { UserSpaceComponent } from './user-space/user-space.component';
import { UserEdituserinfoComponent } from './user-edituserinfo/user-edituserinfo.component';
import { UserPostlistComponent } from './user-postlist/user-postlist.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ActiveuserComponent } from './activeuser/activeuser.component';

export const UserRoutes = [
  {
    path: 'space/:userId',
    component: UserSpaceComponent,
    children: [
      {
        path: '',
        component: UserPostlistComponent
      },
    ]
  },
  {
    path: 'user-edit',
    component: UserEdituserinfoComponent
  },
  {
    path: 'user-register',
    component: UserRegisterComponent
  },
  {
    path: 'changepassword/:userId',
    component: ChangepasswordComponent
  },
  {
    path: 'activeuser',
    component: ActiveuserComponent
  }
]