import { Routes }                   from '@angular/router';

import { AskComponent }             from './ask';
import { FusionComponent }          from './fusion';
import { MediaComponent }           from './media';
import { ServeComponent }           from './serve';

export const SERVE_ROUTES: Routes = [
  { path: 'serve',             component: ServeComponent },
  { path: 'serve/ask',         component: AskComponent },
  { path: 'serve/fusion',      component: FusionComponent },
  { path: 'serve/media',       component: MediaComponent }
];

export const SERVE_COMPONENTS = [
  AskComponent,
  FusionComponent,
  MediaComponent,
  ServeComponent
];
