import { Component, OnInit, ViewChild, PipeTransform, Inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { AppState } from '../../app.service';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submitted = false;
  public deviceinfo:any;
  public loginform: any;

  public username = '';
  public password = '';
  public ismob;
  constructor(
    public appState: AppState,
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) {
    if (isNullOrUndefined(localStorage.getItem("access_token"))) {
      this.appState.getmethod('getaccess/token', '').subscribe(res => {

        if (res.error == false) {
          localStorage.setItem('access_token', res['Access-Token'])
        }
        console.log(res);
      },
        (error) => {
          alert(1)
        })
    }
  }

  ngOnInit(): void {

    
    this.ismob = this.deviceService.isMobile();
      this.deviceinfo =  this.deviceService.getDeviceInfo();
      console.log(this.deviceinfo)
      this.loginform = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      })
    
  }

  get l(): { [key: string]: AbstractControl } {
    return this.loginform.controls;
  }

  save_login(datas: any) {
    this.submitted = true;
    console.log(datas);
    if (this.loginform.valid) {
      
      datas['brower'] = this.deviceinfo.browser;
      datas['user_agent'] = this.deviceinfo.userAgent;
      console.log(datas);

      this.appState.postMethod(datas,'UserLogin','').subscribe(res =>{
        if(res.error == false){
          localStorage.setItem('user_id',res.id);
          localStorage.setItem('user_name',res.User_name);
          localStorage.setItem('Loggin', "allow");
          localStorage.setItem('access_token',res.access_token);
          this.appState.showSuccess("Loggin Success");
         this.router.navigate(['home']);
        }else{
          this.appState.showError(res.message);
        }
        
      },error =>{

      })
      // localStorage.setItem('Loggin', "allow");
      // this.router.navigate(['home'])
    } else {
      return;
    }

  }

}
