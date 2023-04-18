
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { Router, ActivatedRoute } from '@angular/router';
import { throwError as observableThrowError, Observable, Subject } from 'rxjs';
import {
    Component,
    OnInit,
    ChangeDetectorRef, Inject, Injectable,
    PLATFORM_ID
} from '@angular/core';
@Injectable()
export class AppState {
public action ='';
    public api_url = 'https://apiv1.selfmade.technology/'
    public domainirl = '';

    constructor(
        private http: HttpClient,
        public router: Router,
        public route: ActivatedRoute,

    ) {

        this.domainirl = window.location.hostname;
    }

    public getHeaders() {
        let headers = new HttpHeaders();
        headers.append('Accept', 'application/json');


        return headers;
    }


    public postMethod(data: any, apiLink: string, query: string): Observable<any> {
        return this.http.post(this.api_url + apiLink + '?token=' + localStorage.getItem('oauth_token') + query, data , { headers: this.getHeaders()});
        //return this.http.post(this.api_url + apiLink + '?token=' + localStorage.getItem('oauth_token') + query, data, { headers: this.getHeaders() });

        // .subscribe((response: Response) => {
        //     return response.json();
        // });
    }

    public getmethod(apiLink: string, query: string): Observable<any> {
        // , { headers: this.getJWTHeaders() }
        return this.http.get(this.api_url + apiLink + query,{ headers: this.getHeaders() });
    }

    

}