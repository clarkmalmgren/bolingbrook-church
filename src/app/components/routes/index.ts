import { NgModule }                                 from '@angular/core';
import { RouterModule, Routes }                     from '@angular/router';

import { About }                                    from './about';
import { Giving }                                   from './giving';
import { Home }                                     from './home';
import { Locations }                                from './locations';
import { MESSAGE_COMPONENTS, MessageRoutingModule } from './messages/';
import { Newsletter }                               from './newsletter';
import { NotFound }                                 from './not-found';
import { Serve }                                    from './serve/serve';
import { ThankYou }                                 from './thank-you';

const routes: Routes = [
  { path: '',           component: Home },
  { path: 'about',      component: About },
  { path: 'giving',     component: Giving },
  { path: 'locations',  component: Locations },
  { path: 'newsletter', component: Newsletter },
  { path: 'serve',      component: Serve },
  { path: 'thank-you',  component: ThankYou },
  { path: '**',         component: NotFound }
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
  Locations,
  Newsletter,
  NotFound,
  Serve,
  ThankYou,
  ...MESSAGE_COMPONENTS
];

export const ROUTE_MODULES = [
  MessageRoutingModule,
  AppRoutingModule
];
