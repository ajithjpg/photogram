import { Component } from '@angular/core';
import { AppState } from '../../app.service'
import { Router } from '@angular/router';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 public profile_img = ''
  constructor(
    public appservice: AppState,
    public router: Router,
  ) {
    if (!isNullOrUndefined(localStorage.getItem('profile_img'))){
      this.profile_img = localStorage.getItem('profile_img')
    }else{
      this.profile_img = ''
    }
  }

  route_change() {
    var id = localStorage.getItem('user_id')
    this.router.navigate(["profile"]);
  }



  public logout() {
    this.appservice.signout();
  }

  handleSidebarToggle() {
    this.appservice.sidebarExpanded = !this.appservice.sidebarExpanded
  }
}
