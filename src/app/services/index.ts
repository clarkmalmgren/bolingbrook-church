import { BackgroundVideoService, BackgroundVideoSource }  from './background-video.service';
import { ConnectionRequest, ConnectionService }           from './connection.service';
import { Env }                                            from './env';
import { FirebaseService, Database, Storage }             from './firebase.service';
import { Observable }                                     from './observable';
import { MessagesService, Series, Sermon }                from './messages.service';

export const SERVICES = [
  BackgroundVideoService,
  ConnectionService,
  Database,
  Env,
  FirebaseService,
  MessagesService,
  Storage
];

export {
  BackgroundVideoService,
  BackgroundVideoSource,
  ConnectionRequest,
  ConnectionService,
  Database,
  Env,
  FirebaseService,
  MessagesService,
  Observable,
  Series,
  Sermon,
  Storage
};
