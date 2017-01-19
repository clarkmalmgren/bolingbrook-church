import { Routes }                   from '@angular/router';

import { Serve }                    from './serve';
import { Fusion }                   from './fusion';

export const SERVE_ROUTES: Routes = [
  { path: 'serve',             component: Serve },
  { path: 'serve/fusion',      component: Fusion },
];

export const SERVE_COMPONENTS = [
  Serve,
  Fusion
]