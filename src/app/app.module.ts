import { BrowserModule }                                    from '@angular/platform-browser';
import { BrowserAnimationsModule }                          from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler }                           from '@angular/core';
import { FormsModule }                                      from '@angular/forms';
import { HttpModule }                                       from '@angular/http';
import { MATERIAL_MODULES }                                 from './components/atoms/material';
import { AppComponent }                                     from './app.component';
import * as Components                                      from './components';
import { SERVICES, GlobalErrorHandler }                     from './services';

@NgModule({
  declarations: [
    AppComponent,
    ...Components.ATOMS,
    ...Components.MOLECULES,
    ...Components.ORGANISMS,
    ...Components.TEMPLATES,
    ...Components.PAGE_COMPONENTS
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ...MATERIAL_MODULES,
    ...Components.PAGE_MODULES
  ],
  providers: [
    ...SERVICES,
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
