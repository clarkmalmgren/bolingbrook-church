import { EmailRequest } from './email-request'

export type RawConnectRequest = {
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  interests: string[],

  address: string,
  city: string,
  state: string,
  zipcode: string
}

export class ConnectRequest implements EmailRequest {
  
  constructor(private raw: RawConnectRequest) {}
  
  get subject(): string {
    return 'Bolingbrook Church: A New Connection Card has been filled out!'
  }

  get html(): string {
    return `
    <p>A connection card has been submitted online.</p>
  
  <b>From:</b> ${this.raw.first_name} ${this.raw.last_name}
  
  <p>
  <b>Email:</b> ${this.raw.email}<br/>
  <b>Phone:</b> ${this.raw.phone}<br/>
  <b>Address:</b><br/>
  &nbsp;&nbsp;${this.raw.address}<br/>
  &nbsp;&nbsp;${this.raw.city}, ${this.raw.state} ${this.raw.zipcode}<br/>
  </p>
  
  <b>Interests:</b>
  
  <ul>
  ${this.raw.interests.map(i => "<li>" + i + "</li>").join("")}
  </ul>`
  }
}
