import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { About }                  from './about';
import { Giving }                 from './giving';
import { Home }                   from './home';
import { MessageList }            from './messages/';
import { NotFound }               from './not-found';

const routes: Routes = [
  { path: '',         component: Home },
  { path: 'about',    component: About },
  { path: 'giving',   component: Giving },
  { path: 'messages', component: MessageList },
  { path: '**',       component: NotFound },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

export const ROUTE_COMPONENTS = [
  About,
  Giving,
  Home,
  MessageList,
  NotFound
];
