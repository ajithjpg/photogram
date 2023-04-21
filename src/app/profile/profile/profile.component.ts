import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { AppState } from '../../app.service';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  url = '';
  public edit_profileform: any;
  constructor(
    private formBuilder: FormBuilder,
    public appservice:AppState,
    public device:DeviceDetectorService
  ) {

  }
  ngOnInit(): void {
    var action = window.location.pathname.split('/');
    this.url = action[1];

  
    if(this.url == 'profile'){
    this.onload_data();
    }
    if(this.url == 'edit_profile'){
      this.edit_profileform = this.formBuilder.group({
        username: [''],
        Name: [''],
        bio:['']
      })
    }
    
  }
  editSave(datas:any){

  }

  public onload_data(){
    if(!isNullOrUndefined(localStorage.getItem('user_id'))){
      var id = localStorage.getItem("user_id");

      this.appservice.getmethod('profile/'+id,'').subscribe(res =>{
        console.log(res);
        if(res.error ==false){

        }
      },error =>{
        
      })
    }
  }
}
