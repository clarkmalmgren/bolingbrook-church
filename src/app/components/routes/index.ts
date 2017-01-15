import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { About }                  from './about';
import { Home }                   from './home';
import { NotFound }               from './not-found';

const routes: Routes = [
  { path: '',         component: Home },
  { path: 'about',    component: About },
  { path: '**',       component: NotFound },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

export const ROUTE_COMPONENTS = [
  About, Home, NotFound
];
