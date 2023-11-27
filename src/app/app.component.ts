import { Component } from '@angular/core';
import { AppState  } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'photogram';

  constructor(public appstate :AppState){

    this.appstate.requestPermission().then(Permissions =>{
      console.log('Notification permission:', Permissions);
     
      
    })
    .catch(error => {
      console.error('Error requesting notification permission:', error);
    });

    
  }
}
