import { FunctionComponent } from 'react'

export interface BaseFieldProps {
  id: string
}

export interface ProvidedFieldProps<T> {
  value: T
  onChange: (data: T) => void
  onSubmit: () => void
}

export type FieldProps<T> = BaseFieldProps & ProvidedFieldProps<T>

type PartialFieldProps<P extends FieldProps<any>> =
  Omit<P, keyof ProvidedFieldProps<any>> & Partial<ProvidedFieldProps<any>>

type FullyPartialFieldProps<P extends FieldProps<any>> =
  Omit<P, keyof FieldProps<any>> & Partial<FieldProps<any>>

export function partial<P extends FieldProps<any>>(BaseFieldComponent: FunctionComponent<P>): FunctionComponent<PartialFieldProps<P>> {
  return BaseFieldComponent as any
}

export function partialNoId<P extends FieldProps<any>>(BaseFieldComponent: FunctionComponent<P>): FunctionComponent<FullyPartialFieldProps<P>> {
  return BaseFieldComponent as any
}
