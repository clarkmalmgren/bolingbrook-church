'use client'

import { useContext, useEffect } from 'react'
import { KeyType, FormContext } from './Form'

export type UseFormField<T> = {
  flat: string,
  value: T,
  update: (value: T) => void
}

export type ValidityCheck<T> = ((v: T) => boolean) | { required?: boolean }

export function nonEmptyArray(required?: boolean): ValidityCheck<any[] | undefined> {
  return (v) => !required || (!!v && v.length > 0)
}

function isValid<T>(value: T, vc?: ValidityCheck<T>): boolean {
  if (!vc) {
    return true
  } else if (typeof vc === 'function') {
    return vc(value)
  } else if (vc.required) {
    return !!value
  } else {
    return true
  }
}

export function useFormField<T>(key: KeyType, vc?: ValidityCheck<T>): UseFormField<T> {
  const ctx = useContext(FormContext)

  /* We only do this once on load to update the validity state only onload, all other times will be done on write */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const initValue = ctx.getValue(key);
    const initValid = ctx.getValid(key);
    const nextValid = isValid(initValue, vc);
    if (initValid !== nextValid) {
      ctx.setValue(key, initValue, !nextValid);
    }
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  return {
    flat: Array.isArray(key) ? key.join('/') : '' + key,
    value: ctx.getValue(key),
    update: (v) => ctx.setValue(key, v, !isValid(v, vc))
  }
}
