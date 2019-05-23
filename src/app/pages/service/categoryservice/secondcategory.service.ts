import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SecondCategory } from 'src/app/pages/models/secondcategory';
import { Observable } from 'rxjs';
import { RequestSecondCategoryViewModel } from '../../models/manage.request.secondcategory';

@Injectable({
  providedIn: 'root'
})
export class SecondcategoryService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private readonly BASEURL:string = "http://localhost:5000/api/";
  // private readonly BASEURL:string = "/api/";
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  public addSecondCategory(secondcategory: SecondCategory): Observable<any> {
    const url = this.BASEURL+"SecondCategory/manage/addsecondcategory";
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, secondcategory, httpOpt);
  }

  public getSecondCategories(secondCategoryViewModel: RequestSecondCategoryViewModel): Observable<any> {
    const url = this.BASEURL+"SecondCategory/manage/getsecondcategories";
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, secondCategoryViewModel, httpOpt);
  }

  // 获取大分类
  public getFirstCategories(): Observable<any> {
    const url = this.BASEURL+"FirstCategory/getallfirstcategories";
    return this.httpClient.get(url, this.httpOptions);
  }

  // 编辑大分类
  public changeSecondCategoryInfo(secondcategory: SecondCategory): Observable<any>{
    const url = this.BASEURL+"SecondCategory/manage/changesecondcategory";
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, secondcategory, httpOpt); 
  }

  // 删除分类
  public deleteSecondCategory(secondcategory: SecondCategory): Observable<any>{
    const url = this.BASEURL+"SecondCategory/manage/deletesecondcategory";
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, secondcategory, httpOpt); 
  }

  // 恢复分类状态
  recoverySecondCategoryStatus(secondcategory: SecondCategory): Observable<any>{
    const url = this.BASEURL+"SecondCategory/manage/recoverysecondcategorystatus";
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, secondcategory, httpOpt); 
  }
}
