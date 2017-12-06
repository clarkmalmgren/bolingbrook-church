import { Injectable }           from '@angular/core';
import { Observable, Observer } from './observable';
import { Aperture }             from './aperture';

declare namespace YT {

  class Player {
    constructor(
      name: string | Element,
      options?: { }
    );
  }

}

export enum VideoState {
  UNSTARTED   = -1,
  ENDED       =  0,
  PLAYING     =  1,
  PAUSED      =  2,
  BUFFERING   =  3,
  CUED        =  4
}

@Injectable()
export class YoutubeService {

  loaded: boolean = false;
  loading: Observable<any>;

  constructor(private aperture: Aperture) { }

  private loadYoutubeApi(): Observable<any> {
    if (this.loaded) {
      return Observable.of('');
    } else if (this.loading) {
      return this.loading;
    } else {
      this.loading = Observable.create((observer: Observer<any>) => {
        this.aperture.set('onYouTubeIframeAPIReady', (() => {
          this.loaded = true;
          this.loading = undefined;
          observer.next('');
          observer.complete();
        }));

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      });

      return this.loading;
    }
  }

  private getElement(id: string): Observable<Element> {
    return Observable.create((observer: Observer<Element>) => {
      const find = () => {
        const e = document.getElementById(id);
        if (e) {
          observer.next(e);
          observer.complete();
        } else {
          setTimeout(() => { find(); }, 100);
        }
      };

      find();
    });
  }

  videoState(id: string): Observable<VideoState> {
    /* tslint:disable: no-unused-expression */
    return this.loadYoutubeApi()
      .flatMap(() => this.getElement(id))
      .flatMap((element) => {
        return Observable.create((observer: Observer<VideoState>) => {
          new YT.Player(element, {
            events : {
              onStateChange: (event) => { observer.next(event.data); }
            }
          });
        });
      });
  }
}
