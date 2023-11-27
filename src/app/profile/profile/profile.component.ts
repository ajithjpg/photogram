import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  public profiledata;
  url = '';
  public edit_profileform: any;
  public edit_Profile_img;
  public username = '';
  public Name = '';
  public bio = '';
  public selectedFile = [];
  public type = ''
  public user_id = ''

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public appservice: AppState,
    public device: DeviceDetectorService,
    private cd: ChangeDetectorRef
  ) {
    
  }
  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id')
    var action = window.location.pathname.split('/');
    this.url = action[1];
    this.type = action[2]
    if (this.url == 'profile') {
      this.onload_data();
    }
    if (this.url == 'edit_profile') {
      this.edit_profileform = this.formBuilder.group({
        username: [''],
        Name: [''],
        bio: ['']
      })

      this.edit_profile()
    }

  }

  editSave(datas: any) {
    datas['image_url'] = this.edit_Profile_img
  

    this.appservice.postMethod(datas, 'profile/update/' + this.type, '').subscribe(res => {
      if (res.code == 0) {
        this.appservice.showSuccess('Profile Updated Successfully');
        this.router.navigate(['/profile'])
      }else{
        this.appservice.showError('Something went Wrong');
      }
    }, err => {
      if (err.status == 401) {
        this.appservice.signout();
      }
    })
  }

  edit_profile() {
    if (!isNullOrUndefined(this.type)) {
 
      this.appservice.getmethod('profile/edit/' + this.type, "").subscribe(res => {
        if (res.code == 0) {
          this.edit_Profile_img = res.data.profile_picture_url;
          this.Name = res.data.full_name;
          this.username = res.data.username;
          this.bio = res.data.bio;
        } else {

        }

      }, err => {
        if (err.status == 401) {
          this.appservice.signout();
        }
      })
    }
  }

  follow(id){
    if (!isNullOrUndefined(localStorage.getItem('user_id'))) {
      var user_id = localStorage.getItem("user_id"); 
      this.appservice.postMethod('','user/follow/'+ user_id+'/'+id,'').subscribe(res =>{

      }, err => {
        if (err.status == 401) {
          this.appservice.signout();
        }
      })
    }
   
  }

  unfollow(id){
    if (!isNullOrUndefined(localStorage.getItem('user_id'))) {
      var user_id = localStorage.getItem("user_id"); 
      this.appservice.postMethod('','user/unfollow/'+ user_id+'/'+id,'').subscribe(res =>{

      }, err => {
        if (err.status == 401) {
          this.appservice.signout();
        }
      })
    }
   
  }

  backClickedCommon() {
    window.history.back();
  }
  public onload_data() {
    if (isNullOrUndefined(this.type)) {
      this.type = localStorage.getItem('user_id')
    }
      this.appservice.getmethod('getprofile/' + this.type, '').subscribe(res => {
        console.log(res);
        if (res.code == 0) {
          this.profiledata = res.data
        }
      }, err => {
        if (err.status == 401) {
          this.appservice.signout();
        }
      })
    }
  

  onFileSelected(event: any) {
    this.selectedFile = [];
    this.selectedFile.push(event.target.files[0]);
    console.log(this.selectedFile);
    this.image_render(event);

    this.uploadimage()
  }
  uploadimage() {
    var params = new FormData()
    params.append('file', this.selectedFile[0]);

    this.appservice.postMethod(params, 'editprofile/images/' + this.type, '').subscribe(res => {

      if (res.code == 0) {
        this.edit_Profile_img = res.imageURL
      }
    })

  }

  image_render(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.edit_Profile_img = reader.result;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
}
