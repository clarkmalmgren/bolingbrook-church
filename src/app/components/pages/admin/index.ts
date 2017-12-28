import { Routes }                   from '@angular/router';

import { HomeComponent }            from './home';
import { SeriesComponent }          from './series';
import { SermonsComponent }         from './sermons';

export const ADMIN_ROUTES: Routes = [
  { path: 'admin',                  pathMatch: 'full', component: HomeComponent },
  { path: 'admin/series',           pathMatch: 'full', component: SeriesComponent },
  { path: 'admin/sermons',          pathMatch: 'full', component: SermonsComponent }
];

export const ADMIN_COMPONENTS = [
  HomeComponent,
  SeriesComponent,
  SermonsComponent
];
