import { Routes } from '@angular/router';
// app
import {ProfileComponent} from './profile/profile.component'

import { AuthGuard } from '../shared/auth-guard.service';

export const profileRoutes: Routes = [
    {
        path: '',
        children: [
          
          {
           
            path: '',component: ProfileComponent,canActivate: [AuthGuard]
          }, 
        
          
        ]
      }
];