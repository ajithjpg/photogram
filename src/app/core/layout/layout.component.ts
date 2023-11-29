import { Component, ElementRef,Output,Input, NgZone, OnInit,EventEmitter, ChangeDetectorRef, OnDestroy, ViewChild, HostListener, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { Router,NavigationEnd } from '@angular/router';
import {AppState} from '../../app.service'
import {filter} from'rxjs';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  
public url = '';
  public loggedin = false;
  sidebarExpanded = true;
  constructor(
    private router: Router,
    private ref: ChangeDetectorRef,
    public appstate:AppState

  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      
       if(event.url =='/profile' || event.url =='/edit_profile'){
        this.appstate.sidebarExpanded = false;
      }else{
        this.appstate.sidebarExpanded = true;
      }
    })
  }

  ngOnInit(): void {
    this.getpagedata();

    

  }

  ngAfterViewInit() {
    this.ref.detectChanges();
    this.getpagedata();
    this.ref.detectChanges();
  }
  getpagedata(){
   
    this.ref.detectChanges()
    if (!isNullOrUndefined(localStorage.getItem('Loggin'))) {
      var action = window.location.pathname.split('/');
      this.url = action[1];
  
      if (this.url == 'pages') {
        if (action[2] != '404') {

          this.router.navigate(["/home"]);
        } else {
          this.loggedin = false;
          this.router.navigate(['/pages/404']);
        }
      } else {
        this.loggedin = true;
        // this.router.navigate(["/dashboard"]);
      }
      if(this.url =='profile'){
        this.loggedin = true;
      }
      if(this.url =='' || this.url =='/'){
        this.router.navigate(["/home"]);
      }
    } else {
      this.router.navigate(['/pages/login']);
    }
  }

}
