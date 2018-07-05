import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Autoclean }            from '../templates/autoclean';
import { Aperture, Observable } from '../../services';

class Snapshot {
  scrollHeight: number;
  scrollTop: number;
  clientHeight: number;

  constructor(target: Element) {
    this.scrollHeight = target.scrollHeight;
    this.scrollTop = target.scrollTop;
    this.clientHeight = target.clientHeight;
  }
};


@Directive({
  selector: '[bcInfiniteScroll]'
})
export class InfiniteScrollDirective extends Autoclean implements AfterViewInit {

  @Input()
  scrollPercent: number = 70;

  @Output()
  onScroll = new EventEmitter<any>();

  constructor(
    private aperture: Aperture,
    private el: ElementRef
  ) {
    super();
  }

  ngAfterViewInit() {
    const sub =
      this.aperture
        .observableWindowEvent('scroll')
        .map((e: Event) => new Snapshot((e.target as any).scrollingElement as Element))
        .pairwise()
        .filter((pair: Snapshot[]) => pair[0].scrollTop < pair[1].scrollTop)
        .map((pair: Snapshot[]) => pair[1])
        .filter((s: Snapshot) => 100 * (s.scrollTop + s.clientHeight) / s.scrollHeight > this.scrollPercent)
        .subscribe(e => { this.onScroll.emit(''); })

    this.autoclean(sub)
    return sub
  }
}
