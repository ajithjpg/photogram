import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service'
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-sendmessage',
  templateUrl: './sendmessage.component.html',
  styleUrls: ['./sendmessage.component.css']
})
export class SendmessageComponent {

  message = '';
  action = '';
  chatdata = [];
  userid = 0
  constructor(
    public appstate: AppState,
  ) {
   

  }

  ngOnInit() {
    var action = window.location.pathname.split('/');
    if(!isNullOrUndefined(localStorage.getItem('user_id'))){
      this.userid = parseInt(localStorage.getItem('user_id')) 
    }
    console.log(action)
    this.action = action[3];
    this.getmessage(this.action)

  }

  getmessage(id) {

    this.appstate.getmethod('message/' + id, '').subscribe(res => {
      if (res.code == 0) {
        if(res.data.length !=0){
          this.chatdata = res.data
        }

      }
    })
  }

  sendmessage() {
    var datas = {
      'message': this.message,
    }

    this.appstate.postMethod(datas, 'message/send/' + this.action, '').subscribe(res => {
      if (res.code == 0) {
        this.message =''
        this.getmessage(this.action)
      }

    })

  }
}
