import { Component, OnInit, ViewChild, PipeTransform, Inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { AppState } from '../../app.service';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import Validation from '../../shared/validation';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  submitted = false;
  public registerform: any;

  public name = '';
  public email_id = '';
  public phone_number = '';

  public set_password = '';
  public confirm_password = '';
 public ismob;

  constructor(
    public appState: AppState,
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) {

  }

  ngOnInit(): void {
    this.ismob = this.deviceService.isMobile();
    console.log(window.location)

    var action = window.location.pathname.split('/')
    console.log(action)
    if (action[2] == 'signin') {

      this.registerform = this.formBuilder.group({
        name: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        email_id: ['', [Validators.required, Validators.email]],
        phone_number: ['', [Validators.required, Validators.minLength(10),
        Validators.maxLength(15),]],

        set_password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirm_password: ['', Validators.required],
      }, {
        validators: [Validation.match('set_password', 'confirm_password')],
      })
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerform.controls;
  }

  register(datas: any) {
    console.log(datas)
    this.submitted = true;

    if (this.registerform.valid) {

      var post_data = {
        'name': datas.name,
        'user_name': datas.username,
        'email': datas.email_id,
        'mobile': datas.phone_number,
        'password': datas.set_password,
      }

      this.appState.postMethod(post_data,'createUser','').subscribe(res =>{
        if(res.error == false){
          this.appState.showSuccess(res.message);
          this.router.navigate(['pages/login'])
        }else{
          this.appState.showError(res.message);
        }
      })

    } else {
      return;
    }

  }


}
