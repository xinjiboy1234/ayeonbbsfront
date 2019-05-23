import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SecondCategory } from 'src/app/pages/models/secondcategory';
import { Observable } from 'rxjs';
import { Post } from 'src/app/pages/models/post';
import { PostGood } from 'src/app/pages/models/postgood';
import { PostViewModel } from '../../models/postviewmodel';
import { ManageRequestPostViewModel } from '../../models/manage.request.postViewModel';
import { RequestPostViewModel } from '../../models/request.postviewmodel';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private httpClient: HttpClient
  ) { }
  private readonly BASEURL:string = "http://localhost:5000/api/";
  // private readonly BASEURL:string = "/api/";
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public getSecondCategories(): Observable<any> {
    const url = this.BASEURL+"SecondCategory/getallsecondcategories";
    return this.httpClient.get(url);
  }

  public addPost(post: Post): Observable<any> {
    const url =this.BASEURL+"Post/writepost";
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, post, httpOpt);
  }

  public getSecondCategoriesByFirstCategoryId(cid: number): Observable<any> {
    let url = this.BASEURL+"SecondCategory/getsecondcategories/";
    return this.httpClient.get(url+cid);
  }

  public getAllPosts(currPage: number, pageSize: number): Observable<any>{
    let url = this.BASEURL+"Post/getposts/"
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.get(url+currPage+"/"+pageSize, httpOpt);
  }

  public getPostsByFirstCategoryId(firstCategoryId: number, currPage: number, pageSize: number): Observable<any>{
    const url = this.BASEURL+"Post/getpostsbyfirstcategoryid/"
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.get(url + firstCategoryId + "/" + currPage + "/" + pageSize, httpOpt);
  }

  public getPostsBySecondCategoryId(secondCategoryId: number, currPage: number, pageSize: number): Observable<any>{
    const url = this.BASEURL+"Post/getpostsbysecondcategoryid/"
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.get(url + secondCategoryId + "/" + currPage + "/" + pageSize, httpOpt);
  }

  public getHotPosts(): Observable<any>{
    const url = this.BASEURL+"Post/gethotposts";
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.get(url, httpOpt);
  }

  public getPostById(postId: number): Observable<any> {
    const url = this.BASEURL+"Post/getpostbyid/" + postId;
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.get(url, httpOpt);
  }

  // 获取保存的帖子
  public getPostInfo(postId: number): Observable<any> {
    const url = this.BASEURL+"Post/getpostinfo/" + postId;
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.get(url, httpOpt);
  }

  //点赞
  public addPostGood(post: Post): Observable<any>{
    const url = this.BASEURL+"PostGood/addpostgood";
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, post, httpOpt);
  }
  //删除赞
  public deletePostGood(postGood: PostGood): Observable<any>{
    const url = this.BASEURL+"PostGood/deletepostgood";
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, postGood, httpOpt);
  }

  public getPostGoodCountByPostId(post: Post): Observable<any>{
    const url = this.BASEURL+"PostGood/getpostgoodcount/"+post.postId;
    return this.httpClient.get(url);
  }

  public manageGetPosts(postViewModel: ManageRequestPostViewModel): Observable<any>{
    const url = this.BASEURL+"Post/manage/getposts"
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, postViewModel, httpOpt);
  }

  public getTopPostCount(){
    const url = this.BASEURL+"Post/manage/gettoppostcount"
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.get(url, httpOpt);
  }

  // 置顶
  public setTop(postInfo: Post):Observable<any>{
    const url = this.BASEURL+"Post/manage/settop"
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, postInfo, httpOpt);
  }

  // 取消置顶
  public dropTop(postInfo: Post):Observable<any>{
    const url = this.BASEURL+"Post/manage/droptop"
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, postInfo, httpOpt);
  }

  public deletePostInfo(postInfo: Post): Observable<any>{
    const url = this.BASEURL + "Post/deletepostinfo";
    const httpOpt = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, postInfo, httpOpt);
  }

  // 恢复帖子
  public recoveryPostStatus(postInfo: Post): Observable<any>{
    const url = this.BASEURL + "Post/manage/recoverypoststatus";
    const httpOpt = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, postInfo, httpOpt);
  }

  public postMultyDelete(postIds: number[]): Observable<any>{
    const url = this.BASEURL + "Post/manage/postmultydelete";
    const httpOpt = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, postIds, httpOpt);
  }

  // 搜索方法
  public searchPost(postInfoViewModel: RequestPostViewModel): Observable<any>{
    const url = this.BASEURL + "Post/searchpost";
    const httpOpt = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, postInfoViewModel, httpOpt);
  }

  // 保存帖子
  public savePostInfo(postInfo: Post): Observable<any> {
    const url = this.BASEURL + "Post/savepost";
    const httpOpt = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, postInfo, httpOpt);
  }
}
