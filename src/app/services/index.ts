import { Env }                                from './env';
import { FirebaseService }                    from './firebase.service';
import { MessagesService, Series, Service }   from './messages.service';

export const SERVICES = [
  Env,
  FirebaseService,
  MessagesService
];

export {
  Env,
  FirebaseService,
  MessagesService,
  Series,
  Service
};
