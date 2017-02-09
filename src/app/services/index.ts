import { Analytics }                                      from './analytics';
import { BackgroundVideoService, BackgroundVideoSource }  from './background-video.service';
import { ConnectionRequest, ConnectionService }           from './connection.service';
import { Env }                                            from './env';
import { GlobalErrorHandler }                             from './error.handler';
import { FirebaseService, Database, Storage }             from './firebase.service';
import { Observable }                                     from './observable';
import { MessagesService, Series, Sermon }                from './messages.service';

export const SERVICES = [
  Analytics,
  BackgroundVideoService,
  ConnectionService,
  Database,
  Env,
  FirebaseService,
  MessagesService,
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
  MessagesService,
  Observable,
  Series,
  Sermon,
  Storage
};
