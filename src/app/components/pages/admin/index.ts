import { Routes }                   from '@angular/router';

import { Home }                     from './home';
import { Login }                    from './login';
import { SeriesComponent }          from './series';
import { Sermons }                  from './sermons';

export const ADMIN_ROUTES: Routes = [
  { path: 'admin',                  component: Home },
  { path: 'admin/login',            component: Login },
  { path: 'admin/series',           component: SeriesComponent },
  { path: 'admin/sermons',          component: Sermons }
];

export const ADMIN_COMPONENTS = [
  Home,
  Login,
  SeriesComponent,
  Sermons
]