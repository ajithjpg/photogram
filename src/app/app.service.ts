
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { Router, ActivatedRoute } from '@angular/router';
import { throwError as observableThrowError, Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { } from '../app/sendmessage/sendmessage.component'
import {
  Component,
  OnInit,
  ChangeDetectorRef, Inject, Injectable,
  PLATFORM_ID
} from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { io } from "socket.io-client";

@Injectable()
export class AppState {
  private subject: WebSocketSubject<any>;
  private socket: any;

  sidebarExpanded = true
  public action = ''
  // public api_url = 'https://apiv1.selfmade.technology/'
  public api_url = 'http://localhost:8080/'
  readonly uri: string = 'http://localhost:3000';
  public domainirl = '';
  public email = '';
  public chat_data = [];
  constructor(
    private http: HttpClient,
    public router: Router,
    public route: ActivatedRoute,
    public toastrService: ToastrService,
  ) {

    this.domainirl = window.location.hostname;


    // this.showInfo('fiii')
    this.conn();
    this.getMessage('messages').subscribe(data => {
      var user_id = parseInt(localStorage.getItem('user_id'))
      if (this.chat_data.length != 0) {
        for (let i = 0; i < this.chat_data.length; i++) {
          if (this.chat_data[i]['receiver_id'] != user_id) {
            data['user_full_name'] = this.chat_data[i]['user_full_name'];
            data['user_profile_image_url'] = this.chat_data[i]['user_profile_image_url'];
          }
        }
        const audioplay = new Audio('../app/sendmessage/message_tone.mp3');
        audioplay.play()
      }


      this.chat_data.push(data);
    })


  }



  public getHeaders() {

    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'authorization': 'Bearer_' + localStorage.getItem('access_token')
    });

    // let headers = new HttpHeaders();
    // headers.append('Accept', 'application/json');
    // headers.append('authorization', localStorage.getItem('access_token'));
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
    return this.http.post(this.api_url + apiLink + query, data, { headers: this.getHeaders() });

  }

  public getmethod(apiLink: string, query: string): Observable<any> {
    // , { headers: this.getJWTHeaders() }
    return this.http.get(this.api_url + apiLink + query, { headers: this.getHeaders() });
  }

  public postBeforeMethod(data: any, apiLink: string, query: string): Observable<any> {
    return this.http.post(this.api_url + apiLink + query, data, { headers: this.getBeforeHeaders() });
  }

  public getBeforemethod(apiLink: string, query: string): Observable<any> {
    // , { headers: this.getJWTHeaders() }
    return this.http.get(this.api_url + apiLink + query, { headers: this.getBeforeHeaders() });
  }

  public showSuccess(Message: any): void {
    this.toastrService.success(Message, 'Success!');
  }

  public shownotification(Message: any): void {
    this.toastrService.info(Message, 'Success!');
  }

  public showInfo(Message: any): void {
    this.toastrService.info(Message, ' New Notification!');
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



  requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.error('This browser does not support desktop notification');
      return Promise.reject('Desktop notifications not supported');
    }

    return Notification.requestPermission();
  }

  showNotification(title: string, options?: NotificationOptions): void {
    if (!('Notification' in window)) {
      console.error('This browser does not support desktop notification');
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification(title, options);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, options);
        }
      });
    }

  }








  // socket
  conn() {
    this.socket = io(this.api_url, {
      query: {
        token: 'Bearer_' + localStorage.getItem('access_token')
      }

    });
  }

  disconn() {
    this.socket.disconnect()
  }

  getMessage(type): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on(type, (message: any) => {

        observer.next(message);
      });
    });
  }

  sendMessage(type, message): void {
    this.socket.emit(type, message);
  }

  // socket

}