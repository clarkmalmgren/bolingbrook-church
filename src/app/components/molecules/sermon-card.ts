import { Component, Input, OnInit } from '@angular/core';
import { Storage, Sermon }  from '../../services';


@Component({
  selector: 'sermon-card',
  templateUrl: './sermon-card.html',
  styleUrls: [ './sermon-card.scss' ]
})
export class SermonCard {

  @Input() sermon: Sermon;

  constructor(private storage: Storage) {}
  
  get image(): string {
    return `https://i.ytimg.com/vi/${this.sermon.youtube}/hqdefault.jpg`
  }

  get route(): string[] {
    return [ '/sermons', this.sermon.date];
  }

}