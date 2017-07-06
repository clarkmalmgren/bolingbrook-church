import { Component, OnInit }        from '@angular/core';
import { SermonService, Sermon }    from '../../../services';

@Component({
  template: `
    <sda-header></sda-header>
    <main>
      <section class="white">
        <hero image="/assets/messages.png">
          Messages
        </hero>

        <sermon-list></sermon-list>
      </section>
    </main>
  `
})
export class SermonList implements OnInit {

  sermons: Sermon[];

  constructor(private service: SermonService) {}

  ngOnInit() {
    this.service.all()
      .subscribe(sermons => { this.sermons = sermons; });
  }
}
