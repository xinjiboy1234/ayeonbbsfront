import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Post } from '../models/post';
import { PasswordViewModel } from '../models/passwordviewmodel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public subject: Subject<any> = new Subject<any>();
  public userInfo: User;
  private readonly BASEURL:string = "http://localhost:5000/api";
  // private readonly BASEURL:string = "/api";
  private readonly httpOptions = {
    headers: new HttpHeaders({
       'Content-Type': 'application/json'
      })
  };

  constructor(
    private httpClient: HttpClient
  ) { 
  }

  public get currentUser(): Observable<any> {
    return this.subject.asObservable();
  }

  public userLoginService(user: any): Observable<any>{
    return this.httpClient.post(this.BASEURL+"/User/login", user, this.httpOptions)
    .pipe(tap((data: any) => {
      //本地存储用户信息
      localStorage.setItem("currentUser", JSON.stringify(data.userInfo));
      localStorage.setItem("token_key", data.jwttoken);
      this.subject.next(Object.assign({}, data.userInfo));
    }));
  }

  public userLogoutService(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token_key"); //移除Token
    this.subject.next(Object.assign({}));
  }

  // 7天内登陆，续命 token
  public refreshToken(): Observable<any>{
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(this.BASEURL + "/Public/refreshjwttoken", {}, httpOpt);
  }

  public getPostsByUser(userId: number, currPage: number, pageSize: number):Observable<any>{
    const httpOpt = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    const url = this.BASEURL + "/Post/getpostsbyuser/" + userId+"/" + currPage + "/" + pageSize;
    return this.httpClient.get(url, httpOpt);
  }

  public getUserSpaceData(userId: number):Observable<any>{
    const url = this.BASEURL + "/User/userspace/getuserdata/" + userId;
    const httpOpt = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.get(url, httpOpt);
  }

  public deletePostInfo(postInfo: Post): Observable<any>{
    const url = this.BASEURL + "/Post/deletepostinfo";
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, postInfo, httpOpt);
  }
  // 验证登录状态
  public isLogin(userId: number): Observable<any>{
    const url = this.BASEURL + "/Public/isuserlogin/" + userId;
    const httpOpt = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.get(url, httpOpt);
  }

  // 变更用户信息
  public changeUserInfo(userInfo: User): Observable<any>{
    const url = this.BASEURL + "/User/changeuserinfo";
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url,userInfo , httpOpt);
  }

  // 获取用户信息
  public getUserInfo(userId: number){
    const url = this.BASEURL + "/User/getuserinfo/" + userId;
    const httpOpt = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.get(url, httpOpt).subscribe(
      res => {
        //本地存储用户信息
        localStorage.setItem("currentUser", JSON.stringify(res));
        this.subject.next(Object.assign({}, res));
      }
    );
  }

  // 注册
  public userRegiste(userInfo: User): Observable<any>{
    const url = this.BASEURL + "/User/userregiste";
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(url, userInfo, httpOpt);
  }

  // 验证用户名
  public isUserNameExist(loginId: string): Observable<any>{
    const url = this.BASEURL + "/User/isloginidexist/" + loginId;
    return this.httpClient.get(url);
  }

  // 验证昵称是否存在
  public isNickNameExist(userInfo: User): Observable<any>{
    const url = this.BASEURL + "/User/isnicknameexist";
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(url, userInfo, httpOpt);
  }

  // 验证邮箱是否存在
  public isEmailNameExist(userInfo: User): Observable<any>{
    const url = this.BASEURL + "/User/isemailexist";
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(url, userInfo, httpOpt);
  }

  public changePassword(passwordViewModel: PasswordViewModel): Observable<any>{
    const url = this.BASEURL + "/User/changepassword";
    const httpOpt = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, passwordViewModel, httpOpt);
  }

  // 忘记密码
  public forgetPassword(loginId: string): Observable<any>{
    const url = this.BASEURL + "/User/forgetpassword";
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(url, loginId,httpOpt);
  }

  public activeUser(key: string): Observable<any>{
    const url = this.BASEURL + "/User/activeuser?key="+ key;
    return this.httpClient.get(url);
  }
}
