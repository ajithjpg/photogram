import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components/components.component';
import { RouterModule } from '@angular/router';
import {SessionRoutes} from '../session/session.routes'
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    ComponentsComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SessionRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [FormBuilder]
})
export class SessionModule { }
