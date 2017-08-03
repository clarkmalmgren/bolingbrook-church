import { Component, NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SermonComponent }      from './sermon';
import { SermonListComponent }  from './list';

export const SERMON_ROUTES: Routes = [
  /* Legacy Redirects */
  { path: 'messages',                 redirectTo: '/sermons' },
  { path: 'messages/:series',         redirectTo: '/sermons' },
  { path: 'messages/:series/:sermon', redirectTo: '/sermons' },

  {
    path: 'sermons',
    component: SermonListComponent
  },
  {
    path: 'sermons/:sermon',
    component: SermonComponent
  }
];

export const SERMON_COMPONENTS = [
  SermonComponent,
  SermonListComponent
];
