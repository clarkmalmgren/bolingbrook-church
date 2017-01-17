import { Env }                                from './env';
import { FirebaseService }                    from './firebase.service';
import { MessagesService, Series, Sermon }    from './messages.service';

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
  Sermon
};
