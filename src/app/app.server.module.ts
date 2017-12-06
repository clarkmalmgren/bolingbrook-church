import { NgModule }               from '@angular/core';
import { ServerModule }           from '@angular/platform-server';
import { ModuleMapLoaderModule }  from '@nguniversal/module-map-ngfactory-loader';
import { AppModule }              from './app.module';
import { AppComponent }           from './app.component';
import { Aperture }               from './services/aperture';
import { ServerAperture }         from './services/aperture.server';
import { FirebaseService }        from './services/firebase.service';
import { FirebaseServerService }  from './services/firebase.server';

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
  ]
})
export class AppServerModule { }
