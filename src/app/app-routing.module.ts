import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LogComponent } from './log/log.component';
import { RegisterComponent } from './register/register.component';
import { ReclamationComponent } from './component/reclamation/reclamation.component';
import { authGuard } from './services/auth.guard';
import { HomeComponent } from './clientt/home/home.component';
import { ReclamComponent } from './clientt/reclam/reclam.component';


export const Approutes: Routes = [
  {
    path:'',
    redirectTo:'dashboard',
    pathMatch:'full'
    },
  
    {
    path: 'log',
    component: LogComponent,
  },
  
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'home',
    component:HomeComponent
  
  },
  {
    path:'reclam',
    component:ReclamComponent
  },
  {
    path: '',
    component: FullComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) ,canActivate:[authGuard] },
      { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule),canActivate:[authGuard] },
      { path: 'component', loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule) ,canActivate:[authGuard] },
      { path: 'component/reclamation', component: ReclamationComponent ,canActivate:[authGuard] },
     
      
      
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
