import { NgModule }                                   from '@angular/core';
import { ServerModule }                               from '@angular/platform-server';
import { ModuleMapLoaderModule }                      from '@nguniversal/module-map-ngfactory-loader';
import * as express                                   from 'express';
import { AppModule }                                  from './app.module';
import { AppComponent }                               from './app.component';
import { Aperture, FirebaseService, ResponseService } from './services';
import { ServerAperture }                             from './services/aperture.server';
import { FirebaseServerService }                      from './services/firebase.server';
import { ServerResponseService }                      from './services/response.server';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    { provide: Aperture,        useClass: ServerAperture},
    { provide: FirebaseService, useClass: FirebaseServerService },
    { provide: ResponseService, useClass: ServerResponseService }
  ]
})
export class AppServerModule { }
