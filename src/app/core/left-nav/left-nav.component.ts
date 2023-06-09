import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../app.service'
@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {
  public homeactive = '';
  public exploreactive = '';
  public notificationactive = '';
  public messageactive = '';
  public bookmarksactive = '';
  public analyticsactive = '';
  public url = '';
  constructor(
    public router: Router,
    public appstate: AppState
  ) {

  }
  ngOnInit(): void {
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
    if (type == 'bookmarks') {
      this.bookmarksactive = 'active';
      this.router.navigate(["/bookmarks"]);
    } else {
      this.bookmarksactive = ''
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
