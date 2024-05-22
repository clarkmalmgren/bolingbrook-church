import { onRequest, HttpsFunction } from 'firebase-functions/v2/https'
import { sendEmail } from './mailgun'
import { formatterUnsafe } from './formatter'

export const connect: HttpsFunction =
  onRequest({ cors: true }, async (req, res) => {
    const er = formatterUnsafe(req.body)
    await sendEmail(er)
    res.status(200).send({ ok: true })
  })
