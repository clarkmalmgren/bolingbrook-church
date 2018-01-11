import { Analytics }                                          from './analytics';
import { Aperture }                                           from './aperture';
import { BackgroundVideoService, BackgroundVideoSource }      from './background-video.service';
import { ConnectionRequest, ConnectionService }               from './connection.service';
import { Env }                                                from './env';
import { GlobalErrorHandler }                                 from './error.handler';
import { FirebaseService, FirebaseStorage, FirebaseDatabase } from './firebase.service';
import { Observable, Subscription }                           from './observable';
import { Pager, PaginatedPager, LinearPager }                 from './pager';
import { ResponseService }                                    from './response.service';
import { SeriesImageForm, SeriesImageService }                from './series.service';
import { SermonService, Sermon }                              from './sermon.service';
import { FeatureToggles, TogglesService }                     from './toggles.service';
import { YoutubeService, VideoState }                         from './youtube.service';

export const SERVICES = [
  Analytics,
  BackgroundVideoService,
  ConnectionService,
  Env,
  SeriesImageService,
  SermonService,
  TogglesService,
  YoutubeService
];

export {
  Analytics,
  Aperture,
  BackgroundVideoService,
  BackgroundVideoSource,
  ConnectionRequest,
  ConnectionService,
  Env,
  FeatureToggles,
  FirebaseDatabase,
  FirebaseService,
  FirebaseStorage,
  GlobalErrorHandler,
  LinearPager,
  Observable,
  Pager,
  PaginatedPager,
  ResponseService,
  SeriesImageForm,
  SeriesImageService,
  Sermon,
  SermonService,
  Subscription,
  TogglesService,
  VideoState,
  YoutubeService
};
