import { Injectable }                       from '@angular/core';
import { DomSanitizer, SafeResourceUrl }    from '@angular/platform-browser';
import { Env }                              from './env';
import { Storage }                          from './firebase.service';
import { Observable }                       from './observable';

export interface BackgroundVideoSource {
  url: SafeResourceUrl;
  type: string;
}

@Injectable()
export class BackgroundVideoService {

  constructor(
    private env: Env,
    private storage: Storage,
    private sanitizer: DomSanitizer
  ) {}

  getSources(): Observable<BackgroundVideoSource[]> {
    return this.env.useBundledBackgroundVideo ? this.getBundledSources() : this.getStorageSources();
  }

  private getStorageSources(): Observable<BackgroundVideoSource[]> {
    return Observable.merge(
      this.getStorageSource('/videos/homepage.webm', 'video/webm'),
      this.getStorageSource('/videos/homepage.mp4', 'video/mp4'),
    ).toArray();
  }

  private getStorageSource(path: string, type: string): Observable<BackgroundVideoSource> {
      return this.storage.getUrl(path)
        .map(url => { return { url: this.sanitize(url), type: type }; });
  }

  private getBundledSources(): Observable<BackgroundVideoSource[]> {
    return Observable.of([
      { url: this.sanitize('/assets/videos/homepage.webm'), type: 'video/webm' },
      { url: this.sanitize('/assets/videos/homepage.mp4'), type: 'video/mp4' }
    ]);
  }

  private sanitize(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
