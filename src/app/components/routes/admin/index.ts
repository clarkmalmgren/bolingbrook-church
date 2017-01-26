import { Routes }                   from '@angular/router';

import { Home }                     from './home';
import { Login }                    from './login';
import { Messages }                 from './messages';
import { SeriesComponent }          from './series';

export const ADMIN_ROUTES: Routes = [
  { path: 'admin',              component: Home },
  { path: 'admin/login',        component: Login },
  { path: 'admin/messages',     component: Messages },
  { path: 'admin/messages/:id', component: SeriesComponent }
];

export const ADMIN_COMPONENTS = [
  Home,
  Login,
  Messages,
  SeriesComponent
]