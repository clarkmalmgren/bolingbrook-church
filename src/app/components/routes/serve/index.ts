import { Routes }                   from '@angular/router';

import { Serve }                    from './serve';
import { Fusion }                   from './fusion';
import { Setup }                    from './setup';
import { Media }                    from './media';
import { Production }               from './production';

export const SERVE_ROUTES: Routes = [
  { path: 'serve',             component: Serve },
  { path: 'serve/fusion',      component: Fusion },
  { path: 'serve/setup',       component: Setup },
  { path: 'serve/media',       component: Media },
  { path: 'serve/production',  component: Production },
];

export const SERVE_COMPONENTS = [
  Serve,
  Fusion,
  Setup,
  Media,
  Production
]