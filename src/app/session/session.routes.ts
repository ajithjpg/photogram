import { Routes } from '@angular/router';
// app
import {NotFoundComponent} from '../session/not-found/not-found.component'

import {ChangePasswordComponent} from '../session/change-password/change-password.component'
import {LoginComponent} from '../session/login/login.component'
import {SigninComponent} from '../session/signin/signin.component'
export const SessionRoutes: Routes = [
    {
        path: '',
        children: [
          {
            path: "404",
            component: NotFoundComponent
          },
          // {
          //   path: "error",
          //   component: ComponentsComponent
          // },
          {
            path: "forgotten_password",
            component: ChangePasswordComponent
          },
          {
            path: "Change_password",
            component: ChangePasswordComponent
          }, {
            path: "email_confirm",
            component: ChangePasswordComponent
          },{
            path: "email_verify/:id",
            component: ChangePasswordComponent
          },
          {
            path: "signin",
            component: SigninComponent
          },
          {
            path: 'login',
            component: LoginComponent
          }, 
        
          
        ]
      }
];