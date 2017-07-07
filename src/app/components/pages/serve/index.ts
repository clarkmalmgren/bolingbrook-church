import { Routes }                   from '@angular/router';

import { Serve }                    from './serve';
import { Ask }                      from './ask';
import { Fusion }                   from './fusion';
import { Media }                    from './media';

export const SERVE_ROUTES: Routes = [
  { path: 'serve',             component: Serve },
  { path: 'serve/ask',         component: Ask },
  { path: 'serve/fusion',      component: Fusion },
  { path: 'serve/media',       component: Media }
];

export const SERVE_COMPONENTS = [
  Ask,
  Serve,
  Fusion,
  Media
]