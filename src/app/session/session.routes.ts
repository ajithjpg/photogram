import { Routes } from '@angular/router';
// app
import {ComponentsComponent} from '../session/components/components.component'
import {NotFoundComponent} from '../session/not-found/not-found.component'

export const SessionRoutes: Routes = [
    {
        path: '',
        children: [
          {
            path: "404",
            component: NotFoundComponent
          },
          {
            path: "error",
            component: ComponentsComponent
          },
          {
            path: "forgot",
            component: ComponentsComponent
          },
          {
            path: "Change_password",
            component: ComponentsComponent
          },
          {
            path: "signin",
            component: ComponentsComponent
          },
          {
            path: 'login',
            component: ComponentsComponent
          }, 
        
          
        ]
      }
];