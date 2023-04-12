import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import {profileRoutes} from './profile.routes';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ProfileComponent,
    
  ],
  imports: [
    TabsModule,
    CommonModule,
    RouterModule.forChild(profileRoutes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProfileModule { }
