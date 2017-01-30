import { NgModule }                                 from '@angular/core';
import { RouterModule, Routes }                     from '@angular/router';

import { About }                                    from './about';
import { Connect }                                  from './connect';
import { FriendsAndFamily }                         from './friends-and-family';
import { Giving }                                   from './giving';
import { Home }                                     from './home';
import { Locations }                                from './locations';
import { Missions }                                 from './missions';
import { Newsletter }                               from './newsletter';
import { NotFound }                                 from './not-found';
import { ThankYou }                                 from './thank-you';

import { ADMIN_ROUTES, ADMIN_COMPONENTS }           from './admin/';
import { CARE_ROUTES, CARE_COMPONENTS }             from './care/';
import { MESSAGE_COMPONENTS, MessageRoutingModule } from './messages/';
import { SERVE_ROUTES, SERVE_COMPONENTS }           from './serve/';

const routes: Routes = [
  { path: '',                       component: Home },
  { path: 'about',                  component: About },
  { path: 'connect',                component: Connect },
  { path: 'friends-family-sabbath', component: FriendsAndFamily },
  { path: 'giving',                 component: Giving },
  { path: 'locations',              component: Locations },
  { path: 'newsletter',             component: Newsletter },
  { path: 'missions',               component: Missions },
  { path: 'thank-you',              component: ThankYou },
  ...ADMIN_ROUTES,
  ...CARE_ROUTES,
  ...SERVE_ROUTES,
  { path: '**',         component: NotFound }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

export const ROUTE_COMPONENTS = [
  About,
  Connect,
  FriendsAndFamily,
  Giving,
  Home,
  Locations,
  Missions,
  Newsletter,
  NotFound,
  ThankYou,
  ...ADMIN_COMPONENTS,
  ...CARE_COMPONENTS,
  ...SERVE_COMPONENTS,
  ...MESSAGE_COMPONENTS
];

export const ROUTE_MODULES = [
  MessageRoutingModule,
  AppRoutingModule
];
