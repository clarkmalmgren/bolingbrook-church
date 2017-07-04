import { Component, NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SermonList }           from './list';
import { SermonComponent }      from './sermon';

export const SERMON_ROUTES: Routes = [
  /* Legacy Redirects */
  { path: 'messages',                 redirectTo: '/sermons' },
  { path: 'messages/:series',         redirectTo: '/sermons' },
  { path: 'messages/:series/:sermon', redirectTo: '/sermons' },
  
  {
    path: 'sermons',
    component: SermonList
  },
  {
    path: 'sermons/:sermon',
    component: SermonComponent
  }
];

export const SERMON_COMPONENTS = [
  SermonList,
  SermonComponent
];
