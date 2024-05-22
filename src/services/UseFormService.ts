import { FormResponse } from '@/forms/Form'
import { useState } from 'react'
import { useEmulators } from './utils/Firebase'

export type UseFormRequest = {
  title: string
  header: string
  data: { key: string, value: any }[]
}

type SubmitFn = (req: UseFormRequest) => Promise<FormResponse>

export type UseFormService = {
  loading: boolean
  submit: SubmitFn
}

const baseUrl = useEmulators ? `http://localhost:5001/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/us-central1` : process.env.NEXT_PUBLIC_API_URL

export function useFormService(): UseFormService {
  const [ loading, setLoading ] = useState(false)
  
  const submit: SubmitFn = async (req) => {
    setLoading(true)
    const url = `${baseUrl}/connect`
    const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: { 'Content-Type': 'application/json' }
    })
    setLoading(false)

    return resp.ok ? {
      ok: true,
      code: resp.status,
      json: () => resp.json(),
    } : {
      ok: false,
      code: resp.status,
      bodyString: () => Promise.resolve(resp.body?.toString() || '')
    }
  }

  return { loading, submit }
}
