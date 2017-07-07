import { Component, OnInit, Input }       from '@angular/core';
import { DomSanitizer, SafeResourceUrl }  from '@angular/platform-browser';

@Component({
  selector: 'sda-frame',
  templateUrl: './frame.html',
  styleUrls: [ './frame.scss' ]
})
export class Frame implements OnInit {

  constructor(
    private sanitizer: DomSanitizer
  ) {}

  @Input()
  src: string;

  @Input()
  height: string;

  safeSrc: SafeResourceUrl;

  ngOnInit(): void {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
  }
}