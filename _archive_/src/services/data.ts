import { database } from '../utils/firebase'
import { ref, onValue, Unsubscribe } from 'firebase/database'
import { useEffect, useState } from 'react'

export class Data<T> {

  constructor (
    public readonly loaded: boolean,
    public readonly value: T | undefined
  ) {}

  map<S>(fn: (t: T) => S): Data<S> {
    if (this.loaded && this.value) {
      return new Data<S>(true, fn(this.value))
    } else {
      return new Data<S>(false, undefined)
    }
  }
}

export function useData<T>(path: string): Data<T> {
  const watcher = DataWatcher.get<T>(path)
  
  const [ , setX ] = useState(0)
  useEffect(() => watcher.listen(() => setX(Math.random())), []) // eslint-disable-line
  
  return watcher.data
}

class DataWatcher<T> {

  private static singletons: { [path: string]: DataWatcher<any> } = {}

  static get<T>(path: string): DataWatcher<T> {
    if (!(path in this.singletons)) {
      DataWatcher.singletons[path] = new DataWatcher<T>(path)
    }
    return DataWatcher.singletons[path]
  }


  private listeners: { [id: number]: (data: Data<T>) => void } = {}
  private nextListenerId: number = 0
  private initialized: boolean = false
  private unsubscribe: Unsubscribe | undefined = undefined
  private _loaded: boolean = false
  private _value: T | undefined = undefined

  constructor (public readonly path: string) {}

  private notify(): void {
    const data = this.data
    Object.values(this.listeners).forEach(l => l(data))
  }

  private init(): void {
    if (!this.initialized) {
      const dataRef = ref(database, this.path)
      this.unsubscribe = onValue(dataRef, (snap) => {
        this._value = snap.val() || undefined
        this._loaded = true
        this.notify()
      })
      this.initialized = true
    }
  }

  private deinit(): void {
    this.unsubscribe && this.unsubscribe()
    this.unsubscribe = undefined
    this._loaded = false
    this._value = undefined
    this.initialized = false
    this.notify()
  }

  listen(listener: (data: Data<T>) => void): () => void {
    const id = this.nextListenerId++
    this.listeners[id] = listener
    this.init()
    return () => { this.delisten(id) }
  }

  private delisten(id: number): void {
    delete this.listeners[id]
    if (Object.keys(this.listeners).length === 0) {
      this.deinit()
    }
  }

  get data(): Data<T> {
    return new Data(this._loaded, this._value)
  }

}