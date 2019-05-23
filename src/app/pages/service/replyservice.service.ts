import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
import { Reply } from '../models/reply';
import { ReplyGood } from '../models/replygood';

@Injectable({
  providedIn: 'root'
})
export class ReplyserviceService {
  private readonly BASEURL:string = "http://localhost:5000/api/";
  // private readonly BASEURL:string = "/api/";
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
    })
  };
  constructor(
    private httpClient: HttpClient
  ) { }

  public getRepliesByPostId(postId: number,currPage:number, pageSize: number): Observable<any>{
    let url = this.BASEURL+"Reply/getrepliesbypostid/"+postId+"/"+currPage+"/"+pageSize;
    let httpOpt = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.get(url, httpOpt);
  }

  public getReplyInfo(replyId: number): Observable<any>{
    let url = this.BASEURL+"Reply/getreplybyid/"+replyId;
    let httpOpt = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.get(url, httpOpt);
  }

  public getRepliesByReplyId(replyId: number,currPage:number, pageSize: number): Observable<any>{
    let url = this.BASEURL+"Reply/getrepliesbyreplyid/"+replyId+"/"+currPage+"/"+pageSize;
    let httpOpt = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.get(url, httpOpt);
  }

  public addReply(ReplyInfo: Reply): Observable<any>{
    let url = this.BASEURL+"Reply/addreplyinfo";
    let httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, ReplyInfo, httpOpt);
  }

  getReplyGoodCountById(replyId: number):Observable<any>{
    let url = this.BASEURL+"ReplyGood/getreplygoodcount/"+replyId;
    let httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.get(url, httpOpt);
  }

  //点赞
  public addReplyGood(replyInfo: Reply): Observable<any>{
    let url = this.BASEURL+"ReplyGood/addreplygood";
    let httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, replyInfo, httpOpt);
  }
  //删除赞
  public deleteReplyGood(replyGood: ReplyGood): Observable<any>{
    let url = this.BASEURL+"ReplyGood/deletereplygood";
    let httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, replyGood, httpOpt);
  }
}
