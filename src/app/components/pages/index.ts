import { Component, NgModule }                      from '@angular/core';
import { RouterModule, Routes }                     from '@angular/router';

import { AboutComponent }                           from './about';
import { ConnectComponent }                         from './connect';
import { EventsComponent }                          from './events';
import { FriendsAndFamilyComponent }                from './friends-and-family';
import { GivingComponent }                          from './giving';
import { HomeComponent }                            from './home';
import { LocationsComponent }                       from './locations';
import { NewsletterComponent }                      from './newsletter';
import { NotFoundComponent }                        from './not-found';
import { ThankYouComponent }                        from './thank-you';

import { ADMIN_ROUTES, ADMIN_COMPONENTS }           from './admin/';
import { SERMON_COMPONENTS, SERMON_ROUTES }         from './sermons/';
import { SERVE_ROUTES, SERVE_COMPONENTS }           from './serve/';

const routes: Routes = [
  { path: '',                       component: HomeComponent },
  { path: 'about',                  component: AboutComponent },
  { path: 'connect',                component: ConnectComponent },
  { path: 'events',                 component: EventsComponent },
  { path: 'friends-family-sabbath', component: FriendsAndFamilyComponent },
  { path: 'giving',                 component: GivingComponent },
  { path: 'locations',              component: LocationsComponent },
  { path: 'newsletter',             component: NewsletterComponent },
  { path: 'thank-you',              component: ThankYouComponent },
  ...ADMIN_ROUTES,
  ...SERMON_ROUTES,
  ...SERVE_ROUTES,
  { path: '**',                     component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

export const PAGE_COMPONENTS = [
  AboutComponent,
  ConnectComponent,
  EventsComponent,
  FriendsAndFamilyComponent,
  GivingComponent,
  HomeComponent,
  LocationsComponent,
  NewsletterComponent,
  NotFoundComponent,
  ThankYouComponent,
  ...ADMIN_COMPONENTS,
  ...SERVE_COMPONENTS,
  ...SERMON_COMPONENTS
];

export const PAGE_MODULES = [
  AppRoutingModule
];
