import { Component, Input }                       from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Analytics }                              from 'app/services';

@Component({
  selector: 'bc-verse',
  templateUrl: './verse.html',
  styleUrls: [ './verse.scss' ]

})
export class VerseComponent {

  @Input()
  book: string;

  @Input()
  chapter: string;

  @Input()
  verses: string;

  shown: boolean = false;

  _window = window;

  constructor(
    private sanatizer: DomSanitizer,
    private analytics: Analytics
  ) {}

  get url(): string {
    return `https://www.bible.com/bible/111/${this.book}.${this.chapter}.${this.verses}.NIV`;
  }

  get safeResourceUrl(): SafeResourceUrl {
    return this.sanatizer.bypassSecurityTrustResourceUrl(this.url);
  }

  get frameHeight(): string {
    const height = Math.min(600, this._window.innerHeight - 80);
    return `${height}px`;
  }

  launch(): boolean {
    this.analytics.event('nav', 'verse', `${this.book} ${this.chapter}:${this.verses}`);
    this._window.open(this.url, '_blank');
    return false;
  }

  show(): boolean {
    this.analytics.event('overlay', 'verse', `${this.book} ${this.chapter}:${this.verses}`);
    this.shown = true;
    return false;
  }

  hide() {
    this.shown = false;
  }

}
