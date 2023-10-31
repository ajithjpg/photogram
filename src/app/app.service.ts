
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { Router, ActivatedRoute } from '@angular/router';
import { throwError as observableThrowError, Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  Component,
  OnInit,
  ChangeDetectorRef, Inject, Injectable,
  PLATFORM_ID
} from '@angular/core';
@Injectable()
export class AppState {
  public action = '';
  //public api_url = 'https://apiv1.selfmade.technology/'
 public api_url = 'http://localhost:8080/'
  public domainirl = '';
 public email = ''
  constructor(
    private http: HttpClient,
    public router: Router,
    public route: ActivatedRoute,
    public toastrService: ToastrService,
  ) {

    this.domainirl = window.location.hostname;
  }

  public getHeaders() {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('authorization', localStorage.getItem('access_token'));
    return headers;
  }

  public getBeforeHeaders() {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return headers;
  }

  public testService(data, apilink): Observable<any> {
    return this.http.post('http://localhost:8080/' + apilink, data)
  }

  public postMethod(data: any, apiLink: string, query: string): Observable<any> {
    return this.http.post(this.api_url + apiLink  + query, data, { headers: this.getHeaders() });

  }

  public getmethod(apiLink: string, query: string): Observable<any> {
    // , { headers: this.getJWTHeaders() }
    return this.http.get(this.api_url + apiLink + query, { headers: this.getHeaders() });
  }

  public postBeforeMethod(data: any, apiLink: string, query: string): Observable<any> {
    return this.http.post(this.api_url + apiLink  + query, data, { headers: this.getBeforeHeaders() });
  }

  public getBeforemethod(apiLink: string, query: string): Observable<any> {
    // , { headers: this.getJWTHeaders() }
    return this.http.get(this.api_url + apiLink + query, { headers: this.getBeforeHeaders() });
  }

  public showSuccess(Message: any): void {
    this.toastrService.success(Message, 'Success!');
  }

  public showInfo(Message: any): void {
    this.toastrService.info(Message, ' Info!');
  }

  public showWarning(Message: any): void {
    this.toastrService.warning(Message, ' Warning!');
  }

  public showError(Message: any): void {
    this.toastrService.error(Message, 'Error!');
  }

  public signout() {
    localStorage.clear();
    this.router.navigate(["/pages/login"])
  }

}