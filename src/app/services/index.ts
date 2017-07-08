import { Analytics }                                      from './analytics';
import { BackgroundVideoService, BackgroundVideoSource }  from './background-video.service';
import { ConnectionRequest, ConnectionService }           from './connection.service';
import { Env }                                            from './env';
import { GlobalErrorHandler }                             from './error.handler';
import { FirebaseService, Database, Storage }             from './firebase.service';
import { Observable }                                     from './observable';
import { SermonService, Sermon }                          from './sermon.service';
import { FeatureToggles, TogglesService }                 from './toggles.service';

export const SERVICES = [
  Analytics,
  BackgroundVideoService,
  ConnectionService,
  Database,
  Env,
  FirebaseService,
  SermonService,
  TogglesService,
  Storage
];

export {
  Analytics,
  BackgroundVideoService,
  BackgroundVideoSource,
  ConnectionRequest,
  ConnectionService,
  Database,
  Env,
  FirebaseService,
  GlobalErrorHandler,
  SermonService,
  Observable,
  Sermon,
  Storage,
  FeatureToggles,
  TogglesService
};
