import { Component, NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MessageList }          from './list';
import { SeriesComponent }      from './series';
import { SermonComponent }      from './sermon';

@Component({
  template: '<router-outlet></router-outlet>'
})
export class MessageComponent {

}

const routes: Routes = [
  {
    path: 'messages',
    component: MessageComponent,
    children: [
      {
        path: '',
        component: MessageList
      },
      {
        path: ':series',
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
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MessageRoutingModule { }

export const MESSAGE_COMPONENTS = [
  MessageComponent,
  MessageList,
  SeriesComponent,
  SermonComponent
];
