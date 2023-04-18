import { Component, OnInit, ViewChild, PipeTransform, Inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { AppState } from '../../app.service';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submitted = false;

  public loginform: any;

  public username = '';
  public password = '';

  constructor(
    public appState: AppState,
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private router: Router,
  ) {
    if (isNullOrUndefined(localStorage.getItem("access_token"))) {
      this.appState.getmethod('getaccess/token', '').subscribe(res => {

        if (res.error == false) {
          localStorage.setItem('oauth_token', res['Access-Token'])
        }
        console.log(res);
      },
        (error) => {
          alert(1)
        })
    }
  }

  ngOnInit(): void {

    console.log(window.location)

    var action = window.location.pathname.split('/')
    console.log(action)
    if (action[2] == 'login') {
      this.loginform = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      })
    } 
  }

  

  get l(): { [key: string]: AbstractControl } {
    return this.loginform.controls;
  }

  save_login(datas: any) {
    this.submitted = true;
    if (this.loginform.valid) {
      localStorage.setItem('Loggin', "allow");
      this.router.navigate(['home'])
    } else {
      return;
    }

  }

}
