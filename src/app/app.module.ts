import { BrowserModule }                                    from '@angular/platform-browser';
import { NgModule, ErrorHandler }                           from '@angular/core';
import { FormsModule }                                      from '@angular/forms';
import { HttpModule }                                       from '@angular/http';
import { MaterialModule }                                   from '@angular/material';

import { AppComponent }                                     from './app.component';
import * as Components                                      from './components';
import { SERVICES, GlobalErrorHandler }                     from './services';

@NgModule({
  declarations: [
    AppComponent,
    ...Components.ATOMS,
    ...Components.MOLECULES,
    ...Components.ORGANISMS,
    ...Components.ROUTE_COMPONENTS
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    ...Components.ROUTE_MODULES
  ],
  providers: [
    ...SERVICES,
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
