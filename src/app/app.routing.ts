import { LayoutComponent } from './core';
import { AuthGuard } from './shared/auth-guard.service';
import { Routes } from '@angular/router';

/**
 * Define app module routes here, e.g., to lazily load a module
 * (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
 */
export const AppRoutes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
   
    {
      path: 'home',
      loadChildren: () =>
      import("./dashboard/dashboard.module").then(m => m.DashboardModule),
      canActivate: [AuthGuard]
    }, 
    {
      path: 'profile',
      loadChildren: () =>
      import("./profile/profile.module").then(m => m.ProfileModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'edit_profile',
      loadChildren: () =>
      import("./profile/profile.module").then(m => m.ProfileModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'explore',
      loadChildren: () =>
      import("./dashboard/dashboard.module").then(m => m.DashboardModule),
      canActivate: [AuthGuard]
    },

    {
      path: 'notification',
      loadChildren: () =>
      import("./dashboard/dashboard.module").then(m => m.DashboardModule),
      canActivate: [AuthGuard]
    },

    {
      path: 'message',
      loadChildren: () =>
      import("./dashboard/dashboard.module").then(m => m.DashboardModule),
      canActivate: [AuthGuard]
    },

    {
      path: 'Create_post',
      loadChildren: () =>
      import("./dashboard/dashboard.module").then(m => m.DashboardModule),
      canActivate: [AuthGuard]
    },

    {
      path: 'analytics',
      loadChildren: () =>
      import("./dashboard/dashboard.module").then(m => m.DashboardModule),
      canActivate: [AuthGuard]
    },
    
  ]
}, 
{
  path: '',
  component: LayoutComponent,
  children: [{
    path: 'pages',
    redirectTo: 'pages/login'
  }, {
    path: 'pages',
    loadChildren: () =>
    import("../app/session/session.module").then(m => m.SessionModule),
    
  }]
},{
  path: '**',
  redirectTo: 'pages/404'
}];
