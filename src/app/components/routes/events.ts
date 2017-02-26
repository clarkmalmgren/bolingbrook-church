import { Component } from '@angular/core';

@Component({
  template: `
    <div class="contain">
      <sda-frame src="https://calendar.google.com/calendar/b/2/embed?title=Bolingbrook%20Church%20Events&amp;showNav=0&amp;showPrint=0&amp;showCalendars=0&amp;height=600&amp;wkst=1&amp;hl=en&amp;bgcolor=%23FFFFFF&amp;src=bolingbrook.church_od8e1hlhkt534kpb2fv2igsn0k%40group.calendar.google.com&amp;color=%23875509&amp;ctz=America%2FChicago" height="800px">
      </sda-frame>
    </div>
    <sda-footer></sda-footer>
  `,
  styles: [
    `div.contain {
      padding: 10px 5%;
      background-color: #c8c8c8;
    }`
  ]
})
export class Events {
}