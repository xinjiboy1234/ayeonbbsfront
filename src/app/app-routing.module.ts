import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  {path:'', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', loadChildren: './pages/home/home.module#HomeModule'},
  // {path: 'home', loadChildren: './pages/home/home.module#HomeModule'},
  // {path: 'user', loadChildren: './pages/home/home.module#HomeModule'},
  {path: 'login', component: UserLoginComponent},
  {path: 'manage', loadChildren: './pages/manage/manage.module#ManageModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
