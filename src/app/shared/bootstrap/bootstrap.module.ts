import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    BsDropdownModule,
    AlertModule
  ],
  exports: [
    NgbModule,
    BsDropdownModule,
    AlertModule
  ]
})
export class BootstrapModule { }
