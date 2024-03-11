import dynamic from 'next/dynamic'

export const RequireAuth = dynamic(
  () => import('./RequireAuth.client'),
  { ssr: false }
)
