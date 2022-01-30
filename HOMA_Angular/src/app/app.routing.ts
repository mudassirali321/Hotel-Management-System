import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PageNotFoundComponent } from './PageNotFound/page-not-found/page-not-found.component';
const routes: Routes =[
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
    
  // }
    {
     path: '', redirectTo: '/login', pathMatch: 'full'
    },
    { path: 'login', component: LoginComponent, }
  , {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
    },
    { path: '**', component: PageNotFoundComponent }

  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
