import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {SessionRoutes} from '../session/session.routes'
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { SigninComponent } from './signin/signin.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    NotFoundComponent,
    SigninComponent,
    LoginComponent,
    ChangePasswordComponent
  ],
  imports: [
    ToastrModule.forRoot({
      timeOut: 15000, // 15 seconds
      closeButton: true,
      progressBar: false,
    }),
    CommonModule,
    RouterModule.forChild(SessionRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [FormBuilder]
})
export class SessionModule { }
