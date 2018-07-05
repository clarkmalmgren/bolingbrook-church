import { Component, NgModule }                      from '@angular/core';
import { RouterModule, Routes }                     from '@angular/router';

import { AboutComponent }                           from './about';
import { BeliefsComponent }                         from './beliefs';
import { ConnectComponent }                         from './connect';
import { EventsComponent }                          from './events';
import { FriendsAndFamilyComponent }                from './friends-and-family';
import { GivingComponent }                          from './giving';
import { HomeComponent }                            from './home';
import { LocationsComponent }                       from './locations';
import { NewsletterComponent }                      from './newsletter';
import { NotFoundComponent }                        from './not-found';
import { ThankYouComponent }                        from './thank-you';
import { VBSComponent }                             from './vbs';

import { ADMIN_ROUTES, ADMIN_COMPONENTS }           from './admin/';
import { SERMON_COMPONENTS, SERMON_ROUTES }         from './sermons/';
import { SERVE_ROUTES, SERVE_COMPONENTS }           from './serve/';

const routes: Routes = [
  { path: '',                       pathMatch: 'full', component: HomeComponent },
  { path: 'about',                  pathMatch: 'full', component: AboutComponent },
  { path: 'beliefs',                pathMatch: 'full', component: BeliefsComponent },
  { path: 'connect',                pathMatch: 'full', component: ConnectComponent },
  { path: 'events',                 pathMatch: 'full', component: EventsComponent },
  { path: 'friends-family-sabbath', pathMatch: 'full', component: FriendsAndFamilyComponent },
  { path: 'giving',                 pathMatch: 'full', component: GivingComponent },
  { path: 'locations',              pathMatch: 'full', component: LocationsComponent },
  { path: 'newsletter',             pathMatch: 'full', component: NewsletterComponent },
  { path: 'thank-you',              pathMatch: 'full', component: ThankYouComponent },
  { path: 'vbs',                    pathMatch: 'full', component: VBSComponent },
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
  BeliefsComponent,
  ConnectComponent,
  EventsComponent,
  FriendsAndFamilyComponent,
  GivingComponent,
  HomeComponent,
  LocationsComponent,
  NewsletterComponent,
  NotFoundComponent,
  ThankYouComponent,
  VBSComponent,
  ...ADMIN_COMPONENTS,
  ...SERVE_COMPONENTS,
  ...SERMON_COMPONENTS
];

export const PAGE_MODULES = [
  AppRoutingModule
];
