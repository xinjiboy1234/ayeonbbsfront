import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FirstCategory } from 'src/app/pages/models/firstcategory';
import { Observable } from 'rxjs';
import { RequestFirstCategoryViewModel } from '../../models/manage.request.firstcategoryviewmodel';

@Injectable({
  providedIn: 'root'
})
export class FirstcategoryService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private readonly BASEURL:string = "http://localhost:5000/api/";
  // private readonly BASEURL:string = "/api/";
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  //添加大分类
  public addFirstCategory(fistCategory: FirstCategory): Observable<any> {
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(this.BASEURL+"FirstCategory/manage/addfirstcategory",fistCategory, httpOpt);
  }

  // 获取大分类
  public getFirstCategories(firstCategoryViewModel: RequestFirstCategoryViewModel): Observable<any> {
    const url = this.BASEURL+"FirstCategory/getfirstcategories";
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, firstCategoryViewModel, httpOpt);
  }

  // 编辑大分类
  public changeFirstCategoryInfo(firstcategory: FirstCategory): Observable<any>{
    const url = this.BASEURL+"FirstCategory/manage/changefirstcategory";
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, firstcategory, httpOpt); 
  }

  // 删除分类
  public deleteFirstCategory(firstcategory: FirstCategory): Observable<any>{
    const url = this.BASEURL+"FirstCategory/manage/deletefirstcategory";
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, firstcategory, httpOpt); 
  }

  // 恢复分类状态
  recoveryFirstCategoryStatus(firstcategory: FirstCategory): Observable<any>{
    const url = this.BASEURL+"FirstCategory/manage/recoveryfirstcategorystatus";
    const httpOpt = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token_key")}`
      })
    };
    return this.httpClient.post(url, firstcategory, httpOpt); 
  }
}
