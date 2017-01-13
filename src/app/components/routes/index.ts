import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { Home }                   from './home';
import { NotFound }               from './not-found';

const routes: Routes = [
  { path: '',  component: Home },
  { path: '**',  component: NotFound },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

export const ROUTE_COMPONENTS = [
  Home, NotFound
];
