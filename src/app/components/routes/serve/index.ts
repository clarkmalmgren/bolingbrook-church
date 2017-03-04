import { Routes }                   from '@angular/router';

import { Serve }                    from './serve';
import { Ask }                      from './ask';
import { Children }                 from './children';
import { Fusion }                   from './fusion';
import { Media }                    from './media';

export const SERVE_ROUTES: Routes = [
  { path: 'serve',             component: Serve },
  { path: 'madness',           component: Serve },
  { path: 'serve/ask',         component: Ask },
  { path: 'serve/children',    component: Children },
  { path: 'serve/fusion',      component: Fusion },
  { path: 'serve/setup',       component: Ask },
  { path: 'serve/media',       component: Media },
  { path: 'serve/production',  component: Media },
];

export const SERVE_COMPONENTS = [
  Ask,
  Children,
  Serve,
  Fusion,
  Media
]