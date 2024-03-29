import { redirect } from 'react-router-dom'

export type ConnectionRequest = {
  first_name: string
  last_name: string
  address?: string
  city?: string
  state?: string
  zipcode?: string
  phone?: string
  email?: string
  interests?: string[]
}

export async function submitConnect(request: ConnectionRequest): Promise<void> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/connect`, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' }
  })

  if (!response.ok) {
    throw new Error(`Failed to submit connection requst, got a failed response from the server`)
  }

  redirect('/thank-you')
}

export type ServeRequest = {
  first_name: string
  last_name: string
  phone?: string
  email?: string
  interests?: string[]
}

export async function submitServe(request: ServeRequest): Promise<void> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/serve`, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' }
  })

  if (!response.ok) {
    throw new Error(`Failed to submit connection requst, got a failed response from the server`)
  }

  redirect('/thank-you')
}
