import { Component } from '@angular/core';

// tslint:disable-next-line:max-line-length
const URL = 'https://calendar.google.com/calendar/b/2/embed?title=Bolingbrook%20Church%20Events&amp;showNav=0&amp;showPrint=0&amp;showCalendars=0&amp;height=600&amp;wkst=1&amp;hl=en&amp;bgcolor=%23FFFFFF&amp;src=bolingbrook.church_od8e1hlhkt534kpb2fv2igsn0k%40group.calendar.google.com&amp;color=%23875509&amp;ctz=America%2FChicago';

@Component({
  template: `
    <bc-header></bc-header>
    <div class="contain">
      <bc-frame src="${URL}" height="800px">
      </bc-frame>
    </div>
  `,
  styles: [
    `div.contain {
      padding: 10px 5%;
      background-color: #c8c8c8;
    }`
  ]
})
export class EventsComponent {
}
