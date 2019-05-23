import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getElementDepthCount } from '@angular/core/src/render3/state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
public GetMenuUrl = "http://192.168.32.132:4200/firstcategory";

  constructor(public httpClient: HttpClient) { }

  // 获取菜单
  public GetMenu(): Observable<any>{
    return this.httpClient.get(this.GetMenuUrl);
  }
}
