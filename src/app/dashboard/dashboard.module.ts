import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';

import {DashboardRoutes} from './dashboard.routes'
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    ImageCropperModule,
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [FormBuilder]
})
export class DashboardModule { }
