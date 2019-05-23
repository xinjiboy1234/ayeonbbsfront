import { HomeComponent } from './home.component';

export const HomeRoutes = [
  {
    path: '',
    component: HomeComponent,
    children: [{
        path: '',
        loadChildren: '../post/post.module#PostModule'
      },
      {
        path:'user',
        loadChildren: '../user/user.module#UserModule'
      }
    ]
  },
];
