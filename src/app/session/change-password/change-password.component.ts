import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { AppState } from '../../app.service';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  action = '';
  email_id = ''
  type = '';
  status = false;
  constructor(
    public appState: AppState,
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceDetectorService

  ) {

  }
  ngOnInit(): void {
    var action = window.location.pathname.split('/')
    console.log(action)

    if (!isNullOrUndefined(action[2])) {
      this.action = action[2]
    }

    if (this.action == 'email_verify') {
      if (!isNullOrUndefined(action[3])) {
        this.appState.getmethod('users/emailconfirm/'+action[3],'').subscribe(res =>{
          if(res.code == 0 ){
            this.status = true
          }else{
            this.status = false
          }
        })
      }
    }


  }

}
