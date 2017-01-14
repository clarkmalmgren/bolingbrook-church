export { Observable } from 'rxjs/Observable';
export { Observer }   from 'rxjs/Observer';

/* Explicitly include the ways we might generate an observable */
import                     'rxjs/add/observable/fromPromise';

/* Include operators */
import                     'rxjs/add/operator/map';
import                     'rxjs/add/operator/mergeMap';