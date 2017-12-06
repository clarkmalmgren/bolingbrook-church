import { Component, NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SermonComponent }      from './sermon';
import { SermonListComponent }  from './list';

export const SERMON_ROUTES: Routes = [
  /* Legacy Redirects */
  { path: 'messages',                 pathMatch: 'full', redirectTo: '/sermons' },
  { path: 'messages/:series',         pathMatch: 'full', redirectTo: '/sermons' },
  { path: 'messages/:series/:sermon', pathMatch: 'full', redirectTo: '/sermons' },

  {
    path: 'sermons',
    component: SermonListComponent,
    pathMatch: 'full'
  },
  {
    path: 'sermons/:sermon',
    component: SermonComponent,
    pathMatch: 'full'
  }
];

export const SERMON_COMPONENTS = [
  SermonComponent,
  SermonListComponent
];
