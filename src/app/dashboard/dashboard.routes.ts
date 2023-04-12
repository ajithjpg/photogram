import { Routes } from '@angular/router';
// app
import {DashboardComponent} from './dashboard/dashboard.component'

import { AuthGuard } from '../shared/auth-guard.service';

export const DashboardRoutes: Routes = [
    {
        path: '',
        children: [
          
          {
           
            path: '',component: DashboardComponent,canActivate: [AuthGuard]
          }, 
        
          
        ]
      }
];