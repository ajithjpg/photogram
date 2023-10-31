import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendmessageComponent } from './sendmessage.component';
import {SendmessageRoutes} from './sendmessage.routes';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SendmessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SendmessageRoutes),
  ]
})
export class SendmessageModule { }
