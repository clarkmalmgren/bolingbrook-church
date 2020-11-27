import * as mailgun from 'mailgun.js'
import * as functions from 'firebase-functions'
import { EmailRequest } from '../models/email-request'

const client = mailgun.client({ username: 'api', key: functions.config().mailgun.key })
const domain = functions.config().mailgun.domain

const base = {
  from: functions.config().mailgun.from,
  to: functions.config().mailgun.to.split(',').map((i: string) => i.trim())
}

export async function sendEmail(req: EmailRequest): Promise<void> {
  return await client.messages.create(domain, { ...base, subject: req.subject, html: req.html })
}
