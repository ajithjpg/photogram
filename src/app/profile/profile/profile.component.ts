import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  url = '';
  public edit_profileform: any;
  constructor(
    private formBuilder: FormBuilder,
  ) {

  }
  ngOnInit(): void {
    var action = window.location.pathname.split('/');
    this.url = action[1];

    this.edit_profileform = this.formBuilder.group({
      username: [''],
      Name: [''],
      bio:['']
    })
  }
  editSave(datas:any){

  }
}
