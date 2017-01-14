import { BrowserModule }                                    from '@angular/platform-browser';
import { NgModule }                                         from '@angular/core';
import { FormsModule }                                      from '@angular/forms';
import { HttpModule }                                       from '@angular/http';

import { AppComponent }                                     from './app.component';
import * as Components                                      from './components';
import { SERVICES }                                         from './services';

@NgModule({
  declarations: [
    AppComponent,
    ...Components.MATERIAL,
    ...Components.MOLECULES,
    ...Components.ROUTE_COMPONENTS
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Components.AppRoutingModule
  ],
  providers: [
    Components.MdIconRegistry,
    ...SERVICES
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
