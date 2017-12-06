import { Routes }                   from '@angular/router';

import { AskComponent }             from './ask';
import { FusionComponent }          from './fusion';
import { MediaComponent }           from './media';
import { ServeComponent }           from './serve';

export const SERVE_ROUTES: Routes = [
  { path: 'serve',        pathMatch: 'full', component: ServeComponent },
  { path: 'serve/ask',    pathMatch: 'full', component: AskComponent },
  { path: 'serve/fusion', pathMatch: 'full', component: FusionComponent },
  { path: 'serve/media',  pathMatch: 'full', component: MediaComponent }
];

export const SERVE_COMPONENTS = [
  AskComponent,
  FusionComponent,
  MediaComponent,
  ServeComponent
];
