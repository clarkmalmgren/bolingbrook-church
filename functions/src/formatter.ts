import { EmailRequest } from './mailgun'

export type RawConnectRequest = {
  title: string
  header: string
  data: { key: string, value: any }[]
}

export function formatterUnsafe(body: any): EmailRequest {
  return formatter(body as RawConnectRequest)
}

export function formatter(raw: RawConnectRequest): EmailRequest {
  const subject = raw.title

  let html = raw.header ? `<p>${raw.header}</p>` : ''
  raw.data.forEach(d => {
    html += `<b>${d.key}:</b> `
    if (Array.isArray(d.value)) {
      html += '<ul>'
      d.value.forEach(e => { html += `  <li>${e}</li>` })
      html += '</ul>'
    } else {
      html += `${d.value || ''} <br/>`
    }
  })

  return { subject, html }
}
