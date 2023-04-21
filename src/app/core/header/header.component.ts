import { Component } from '@angular/core';
import {AppState} from '../../app.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    public appservice : AppState
  ){

  }
  public logout(){
this.appservice.signout();
  }
}
