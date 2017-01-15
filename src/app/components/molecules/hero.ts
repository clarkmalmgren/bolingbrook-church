import { Component, Input } from '@angular/core';

@Component({
  selector: 'hero',
  templateUrl: './hero.html',
  styleUrls: [ './hero.scss' ]
})
export class Hero {
  @Input() image: string;

  get imageUrl(): string {
    return `url('${this.image}')`;
  }
}