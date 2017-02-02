import { Component, NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MessageList }          from './list';
import { SeriesComponent }      from './series';
import { SermonComponent }      from './sermon';

export const MESSAGE_ROUTES: Routes = [
  {
    path: 'messages',
    component: MessageList
  },
  {
    path: 'messages/:series', 
    component: SeriesComponent,
    children: [
      {
        path: '',
        redirectTo: '0',
        pathMatch: 'full'
      },
      {
        path: ':sermon',
        component: SermonComponent
      }
    ]
  }
];

export const MESSAGE_COMPONENTS = [
  MessageList,
  SeriesComponent,
  SermonComponent
];
