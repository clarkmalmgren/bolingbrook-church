import dynamic from 'next/dynamic'

export const FormEditor = dynamic(
  () => import('./FormEditor.client').then((d) => d.FormEditorClient),
  { ssr: false }
)
