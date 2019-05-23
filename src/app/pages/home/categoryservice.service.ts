import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryserviceService {
  private readonly BASEURL="http://localhost:5000/api/"
  // private readonly BASEURL="/api/"
  private readonly GETFIRSTCATEGORYURL: string = this.BASEURL+"FirstCategory/getallfirstcategories/";
  private readonly GETSECONDCATEGORYURL: string = this.BASEURL+"SecondCategory/getsecondcategories/"
  private readonly httpOptions = {
    headers: new HttpHeaders({
       'authorization': `Bearer ${localStorage.getItem("token_key")}`
      })
  };
  constructor(
    public httpClient: HttpClient
  ) { }

  public getFirstCategories(): Observable<any> {
    return this.httpClient.get(this.GETFIRSTCATEGORYURL, this.httpOptions);
  }

  public getSecondCategory(cid: number): Observable<any> {
    return this.httpClient.get(this.GETSECONDCATEGORYURL+cid);
  }
}
