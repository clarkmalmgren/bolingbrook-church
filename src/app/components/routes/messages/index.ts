import { Component, NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MessageList }          from './list';

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
  MessageList
];
