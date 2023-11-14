import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendmessageComponent } from './sendmessage.component';
import {SendmessageRoutes} from './sendmessage.routes';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SendmessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SendmessageRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [FormBuilder]
})
export class SendmessageModule { }
