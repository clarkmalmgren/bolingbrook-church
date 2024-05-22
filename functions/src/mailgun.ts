import FormData from 'form-data'
import Mailgun from 'mailgun.js'
import { config } from 'firebase-functions'

const mgConfig = config().mailgun
const mailgun = new Mailgun(FormData)
const client = mailgun.client({ username: 'api', key: mgConfig.key })
const domain = mgConfig.domain

export type EmailRequest = {
  subject: string,
  html: string
}

const base = {
  from: mgConfig.from,
  to: mgConfig.to.split(',').map((i: string) => i.trim())
}

export async function sendEmail(req: EmailRequest): Promise<void> {
  await client.messages.create(domain, { ...base, ...req })
}
