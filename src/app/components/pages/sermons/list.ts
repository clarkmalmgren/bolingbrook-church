import { Component, OnInit }        from '@angular/core';
import { SermonService, Sermon }    from '../../../services';

@Component({
  template: `
    <bc-header image="/assets/messages.png" relativeHeight="0.4" shade="0.4">
      <h2>Sermons</h2>
    </bc-header>
    <main>
      <section class="white">
        <bc-sermon-list></bc-sermon-list>
      </section>
    </main>
  `
})
export class SermonListComponent implements OnInit {

  sermons: Sermon[];

  constructor(private service: SermonService) {}

  ngOnInit() {
    this.service.complete()
      .subscribe(sermons => { this.sermons = sermons; });
  }
}
