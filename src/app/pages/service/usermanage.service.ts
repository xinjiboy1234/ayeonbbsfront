import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { RequestUserViewModel } from '../models/manage.request.userviewmodel';

@Injectable({
  providedIn: 'root'
})
export class UsermanageService {
  private readonly BASEURL:string = "http://localhost:5000/api/";
  // private readonly BASEURL:string = "/api/";
  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  doLogout(){
    localStorage.removeItem("currentUser");
    this.router.navigate(['/login']);
  }
  
  getUserInfos(userInfoViewModel: RequestUserViewModel):Observable<any> {
    let url =this.BASEURL+"User/manage/getuserinfos";
    let httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, userInfoViewModel, httpOpt);
  }

  getUserInfo(userId: number):Observable<any> {
    let url =this.BASEURL+"User/manage/getuserinfo/"+userId;
    let httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.get(url, httpOpt);
  }

  public getSecondCategories(): Observable<any> {
    let url = this.BASEURL+"SecondCategory/getallsecondcategories";
    let httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.get(url, httpOpt);
  }

  public changeUserInfo(userInfo: User): Observable<any>{
    let url =this.BASEURL+"User/manage/changeuserinfo";
    let httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, userInfo, httpOpt);
  }

  public multyDeleteUser(userInfoViewModel: RequestUserViewModel):Observable<any>{
    let url =this.BASEURL+"User/manage/multydeleteuserinfo";
    let httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, userInfoViewModel, httpOpt);
  }

  recoveryUserStatus(userInfo: User): Observable<any>{
    let url =this.BASEURL+"User/manage/recoveryuserstatus";
    let httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, userInfo, httpOpt);
  }

  deleteUser(userInfo: User): Observable<any>{
    let url =this.BASEURL+"User/manage/deleteuserinfo";
    let httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, userInfo, httpOpt);
  }

  // 是否是超级管理员
  isSupperManager(userId: number): Observable<any>{
    let url =this.BASEURL+"User/manage/issuppermanager/" + userId;
    let httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.get(url, httpOpt);
  }
}
