import { Component, Input } from '@angular/core';

@Component({
  selector: 'banner',
  templateUrl: './banner.html',
  styleUrls: [ './banner.scss' ]
})
export class Banner {
  @Input() image: string;

  get imageUrl(): string {
    return `url('${this.image}')`;
  }
}