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
  profile_name = ''
  profile_img = ''
  conversation_id = 0;
  type_status = ''
  constructor(
    public appstate: AppState,
  ) {

    this.appstate.getMessage('typing').subscribe(res => {
      this.type_status = res
    })

  }

  ngOnInit() {
    var action = window.location.pathname.split('/');
    if (!isNullOrUndefined(localStorage.getItem('user_id'))) {
      this.userid = parseInt(localStorage.getItem('user_id'))
    }
    console.log(action)
    this.action = action[3];
    this.getmessage(this.action)

  }

  getmessage(id) {

    this.appstate.getmethod('message/' + id, '').subscribe(res => {
      if (res.code == 0) {
        if (res.data.length != 0) {
          this.chatdata = res.data;
          this.appstate.chat_data = this.chatdata;
          this.profile_name = res.profile_name;
          this.profile_img = res.profile_img;
          this.conversation_id = res.data[0]['conversation_id']
        } else {
          this.conversation_id = 0;
          this.chatdata = []
        }

      }
    })
  }

  sendmessage() {

    if (this.message != '') {
      var datas = {
        'conversation_id': this.conversation_id,
        'sender_id': this.userid,
        'receiver_id': this.action,
        'message': this.message,
        'date_on': new Date(),
        "read": 0
      }

      this.appstate.sendMessage('send-message', datas);

      var user_id = parseInt(localStorage.getItem('user_id')) 
      if(this.appstate.chat_data.length !=0){
        for (let i = 0; i < this.appstate.chat_data.length; i++) {
          if(this.appstate.chat_data[i]['sender_id'] == user_id  ){
            datas['user_full_name'] = this.appstate.chat_data[i]['user_full_name'];
            datas['user_profile_image_url'] = this.appstate.chat_data[i]['user_profile_image_url'];
          }
        }
      }
      this.appstate.chat_data.push(datas);
      this.message = ''
    }
    // return
    // this.appstate.postMethod(datas, 'message/send/' + this.action, '').subscribe(res => {
    //   if (res.code == 0) {
    //     this.message = ''
    //     this.getmessage(this.action)
    //   }

    // })

  }

  typingdect(event) {

    console.log(event.type)


    if (event.type != 'blur') {
      this.appstate.sendMessage('typing', 'yes')
    } else {
      this.appstate.sendMessage('typing', 'no')
    }
  }
}
