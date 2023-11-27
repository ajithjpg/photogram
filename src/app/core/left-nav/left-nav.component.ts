import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../app.service';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {
  noexp = ''
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  public homeactive = '';
  public exploreactive = '';
  public notificationactive = '';
  public messageactive = '';
  public bookmarksactive = '';
  public analyticsactive = '';
  createpost_active = ''
  public profile_img = '';
  public user_name = '';
  public url = '';
  constructor(
    public router: Router,
    public appstate: AppState
  ) {
    if (!isNullOrUndefined(localStorage.getItem('profile_img'))){
      this.profile_img = localStorage.getItem('profile_img')
    }else{
      this.profile_img = ''
    }

    if (!isNullOrUndefined(localStorage.getItem('user_name'))){
      this.user_name = localStorage.getItem('user_name')
    }else{
      this.user_name = ''
    }
  }
  ngOnInit(): void {
    var action = window.location.pathname.split('/');
    this.url = action[1];
    this.route_change(this.url);
    if(this.appstate.sidebarExpanded == false){
      
    }
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
      this.createpost_active = 'active';
      this.router.navigate(["/Create_post"]);
    } else {
      this.createpost_active = '';
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

  handleSidebarToggle(){
    console.log(this.isExpanded)
    this.toggleSidebar.emit(!this.isExpanded)
  } 
}
