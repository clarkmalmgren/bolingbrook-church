import { Component, OnInit }        from '@angular/core';
import { SermonService, Sermon }    from '../../../services';

@Component({
  template: `
    <sda-header image="/assets/messages.png" relativeHeight="0.4" shade="0.4">
      <h2>Sermons</h2>
    </sda-header>
    <main>
      <section class="white">
        <sermon-list></sermon-list>
      </section>
    </main>
  `
})
export class SermonList implements OnInit {

  sermons: Sermon[];

  constructor(private service: SermonService) {}

  ngOnInit() {
    this.service.complete()
      .subscribe(sermons => { this.sermons = sermons; });
  }
}
