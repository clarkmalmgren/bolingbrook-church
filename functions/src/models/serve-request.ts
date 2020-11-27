import { EmailRequest } from './email-request'

export type RawServeRequest = {
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  interests: string[]
}

export class ServeRequest implements EmailRequest {
  
  constructor(private raw: RawServeRequest) { }
  
  get subject(): string {
    return 'Bolingbrook Church: A New Serve Card has been filled out!'
  }

  get html(): string {
    return `
    <p>A serve card has been submitted online.</p>
  
  <b>From:</b> ${this.raw.first_name} ${this.raw.last_name}
  
  <p>
  <b>Email:</b> ${this.raw.email}<br/>
  <b>Phone:</b> ${this.raw.phone}<br/>
  </p>
  
  <b>Interests:</b>
  
  <ul>
  ${this.raw.interests.map(i => "<li>" + i + "</li>").join("")}
  </ul>`
  }
}
