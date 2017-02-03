import { Routes }                   from '@angular/router';

import { DivorceCare }                     from './divorce';
import { InnerViewCare }                   from './inner-view';
import { MarriageCare }                    from './marriage';

export const CARE_ROUTES: Routes = [
  { path: 'divorcecare',        component: DivorceCare },
  { path: 'inner-views',        component: InnerViewCare },
  { path: 'marriagecare',       component: MarriageCare }
];

export const CARE_COMPONENTS = [
  DivorceCare,
  InnerViewCare,
  MarriageCare
]