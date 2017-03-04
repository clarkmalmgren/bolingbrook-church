import { Component, Input } from '@angular/core';

@Component({
  selector: 'hero',
  templateUrl: './hero.html',
  styleUrls: [ './hero.scss' ]
})
export class Hero {
  @Input() image: string;
  @Input() center: boolean;

  get imageUrl(): string {
    return `url('${this.image}')`;
  }

  get xPosition(): string {
    return this.center ? 'center' : 'left';
  }
}