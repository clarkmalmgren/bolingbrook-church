import { Routes }                   from '@angular/router';

import { HomeComponent }            from './home';
import { LoginComponent }           from './login';
import { SeriesComponent }          from './series';
import { SermonsComponent }         from './sermons';

export const ADMIN_ROUTES: Routes = [
  { path: 'admin',                  pathMatch: 'full', component: HomeComponent },
  { path: 'admin/login',            pathMatch: 'full', component: LoginComponent },
  { path: 'admin/series',           pathMatch: 'full', component: SeriesComponent },
  { path: 'admin/sermons',          pathMatch: 'full', component: SermonsComponent }
];

export const ADMIN_COMPONENTS = [
  HomeComponent,
  LoginComponent,
  SeriesComponent,
  SermonsComponent
];
