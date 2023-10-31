import { Routes } from '@angular/router';
// app
import {SendmessageComponent} from './sendmessage.component'

import { AuthGuard } from '../shared/auth-guard.service';

export const SendmessageRoutes: Routes = [
    {
        path: '',
        children: [
          
          {
           
            path: '',component: SendmessageComponent,canActivate: [AuthGuard]
          }, 
        
          
        ]
      }
];