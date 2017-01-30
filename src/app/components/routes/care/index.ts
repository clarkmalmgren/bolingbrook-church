import { Routes }                   from '@angular/router';

import { DivorceCare }                     from './divorce';
import { MarriageCare }                    from './marriage';

export const CARE_ROUTES: Routes = [
  { path: 'divorcecare',        component: DivorceCare },
  { path: 'marriagecare',       component: MarriageCare }
];

export const CARE_COMPONENTS = [
  DivorceCare,
  MarriageCare
]