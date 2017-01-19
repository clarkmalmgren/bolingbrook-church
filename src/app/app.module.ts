import { BrowserModule }                                    from '@angular/platform-browser';
import { NgModule }                                         from '@angular/core';
import { FormsModule }                                      from '@angular/forms';
import { HttpModule }                                       from '@angular/http';
import { MaterialModule }                                   from '@angular/material'; 

import { AppComponent }                                     from './app.component';
import * as Components                                      from './components';
import { SERVICES }                                         from './services';

@NgModule({
  declarations: [
    AppComponent,
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
    ...SERVICES
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
