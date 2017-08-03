import { Routes }                   from '@angular/router';

import { HomeComponent }            from './home';
import { LoginComponent }           from './login';
import { SeriesComponent }          from './series';
import { SermonsComponent }         from './sermons';

export const ADMIN_ROUTES: Routes = [
  { path: 'admin',                  component: HomeComponent },
  { path: 'admin/login',            component: LoginComponent },
  { path: 'admin/series',           component: SeriesComponent },
  { path: 'admin/sermons',          component: SermonsComponent }
];

export const ADMIN_COMPONENTS = [
  HomeComponent,
  LoginComponent,
  SeriesComponent,
  SermonsComponent
];
