import { Component, OnInit, ViewChild, PipeTransform, Inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { AppState } from '../../app.service';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {

  public registerform: any;
  public loginform: any;
  public change = "";

  public username = '';
  public password = '';

  public name = '';
  public email_id = '';
  public phone_number = '';
  public set_password = '';
  public confirm_password = '';
  public initialCountry = 'in';
  public cellnumber1DialCode = '91';
  public step = 0;
  public type = '';
  constructor(
    public appState: AppState,
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private router: Router,
  ) {
    if (isNullOrUndefined(localStorage.getItem("access_token"))) {
     this.appState.getmethod('getaccess/token','').subscribe(res =>{
      console.log(res);
     })
    }
  }

  ngOnInit(): void {

    console.log(window.location)

    var action = window.location.pathname.split('/')
    console.log(action)
    if (action[2] == 'login') {
      this.change = ""
      this.type = action[2];
      this.loginform = this.formBuilder.group({
        username: [''],
        password: [''],
      })
    } else if (action[2] == 'signin') {
      this.change = "sign-up-mode"
      this.type = action[2];
      this.registerform = this.formBuilder.group({
        name: [''],
        email_id: [''],
        phone_number: [''],
      })
    } else if (action[2] == 'Change_password') {
      this.change = ""
      this.type = action[2];
    }
  }

  createacc() {
    this.change = "sign-up-mode"
    setTimeout(() => {
      this.router.navigate(['pages/signin'])
    }, 2000);


  }

  login() {
    this.change = "";
    setTimeout(() => {
      this.router.navigate(['pages/login'])
    }, 2000);

  }

  register(datas: any, step: any) {
    console.log(datas)
    this.step = step;
    if (step == 2) {
      this.change = "";
      setTimeout(() => {
        this.router.navigate(['pages/login'])
      }, 2000);
    }
  }

  onCell1CountryChange(e: any) {

    this.initialCountry = e.iso2;
    this.cellnumber1DialCode = e.dialCode;
  }
login_save(datas:any){
  localStorage.setItem('Loggin',"allow");
  this.router.navigate(['home'])
}
}
