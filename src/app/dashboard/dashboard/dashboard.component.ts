import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public action = '';
  public homeactive = '';
  public exploreactive = '';
  public notificationactive = '';
  public messageactive = '';
  public createactive = '';
  public analyticsactive = '';
  public url = '';
  public feeds_data = [
    { name: 'dilli', post: '../../../assets/img/feed-1.jpg', profile_img: '../../../assets/img/feed-1.jpg', post_desc: '' },
    { name: 'dilli', post: '../../../assets/img/feed-2.jpg', profile_img: '../../../assets/img/feed-2.jpg', post_desc: '' },
    { name: 'dilli', post: '../../../assets/img/feed-3.jpg', profile_img: '../../../assets/img/feed-3.jpg', post_desc: '' },
    { name: 'dilli', post: '../../../assets/img/feed-4.jpg', profile_img: '../../../assets/img/feed-4.jpg', post_desc: '' },
    { name: 'dilli', post: '../../../assets/img/feed-5.jpg', profile_img: '../../../assets/img/feed-5.jpg', post_desc: '' },
  ];
  constructor(
    public router:Router,
    public appstate:AppState
  ){

  }
  ngOnInit(): void {
    var action = window.location.pathname.split('/');
    this.action = action[1];

    if(this.action =='home'){

    }

    var action = window.location.pathname.split('/');
    this.url = action[1];
    this.route_change(this.url);
  }

  route_change(type: any) {
    this.appstate.action = type;
    if (type == 'home') {
      this.homeactive = 'active'
      this.router.navigate(["/home"]);
    } else {
      this.homeactive = ''
    }
    if (type == 'explore') {
      this.exploreactive = 'active';
      this.router.navigate(["/explore"]);
    } else {
      this.exploreactive = '';
    }
    if (type == 'notification') {
      this.notificationactive = 'active';
      this.router.navigate(["/notification"]);
    } else {
      this.notificationactive = '';
    }
    if (type == 'message') {
      this.messageactive = 'active';
      this.router.navigate(["/message"]);
    } else {
      this.messageactive = '';
    }
    if (type == 'Create_post') {
      this.createactive = 'active';
      this.router.navigate(["/Create_post"]);
    } else {
      this.createactive = ''
    }
    if (type == 'analytics') {
      this.analyticsactive = 'active';
      this.router.navigate(["/analytics"]);
    } else {
      this.analyticsactive = '';
    }
    if (type == 'profile') {
      this.router.navigate(["/profile"]);
    }
  }
}
