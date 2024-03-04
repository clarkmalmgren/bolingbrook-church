
export interface Option<T> {
  
  readonly isDefined: boolean

  map<S>(fn: (value: T) => S): Option<NonNullable<S>>

  prop<K extends keyof T>(k: K): Option<T[K]>

  get(): T

  getOrUndefined(): T | undefined

  getOrElse(defaultValue: T): T

  noneIf(fn: (value: T) => boolean): Option<T>
}

export class None<T> implements Option<T> {

  static readonly singleton = new None<any>()

  isDefined = false
  
  map = () => None.singleton
  prop = () => None.singleton
  noneIf = () => None.singleton

  get(): T {
    throw new Error("Value of None requested")
  }

  getOrUndefined = () => undefined
  getOrElse = (defaultValue: T) => defaultValue
}

export class Some<T> implements Option<T> {
  
  constructor(private readonly value: T) {
    if (value == null) {
      throw new Error(`Can't construct Some without a value ${value}`)
    }
  }
  
  isDefined = true

  map<S>(fn: (value: T) => S) {
    return Option(fn(this.value))
  }

  prop<K extends keyof T>(k: K) {
    return Option(this.value[k])
  }

  noneIf(fn: (value: T) => boolean) {
    return fn(this.value) ? None.singleton : this
  }

  get = () => this.value
  getOrUndefined = () => this.value
  getOrElse = (defaultValue: T) => this.value
}

// eslint-disable-next-line
export function Option<T>(value: T | null | undefined): Option<T> {
  return null == value ? None.singleton : new Some(value)
}

export function TruthyOption<T>(value: T | null | undefined): Option<T> {
  return !value ? None.singleton : new Some(value)
}
