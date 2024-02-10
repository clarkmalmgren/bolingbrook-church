import { https, HttpsFunction } from 'firebase-functions'
import { EmailRequest } from './models/email-request'
import { sendEmail } from './services/mailgun'


export class ConnectController {

  constructor(private factory: (body: any) => EmailRequest) {}

  get handler(): HttpsFunction {
    return https.onRequest(async (req, res) => {
      const er = this.factory(req.body)
      await sendEmail(er)
      res.status(202).send(req.body)
    })
  }
}