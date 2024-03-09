import { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, Unsubscribe as FirebaseUnsubscribe, Firestore } from 'firebase/firestore'

export type Listener<T> = (data: T) => void | any
export type Unsubscribe = (() => void) & { id: number }
enum State {
  Disconnected,
  Connecting,
  Connected,
  Disconnecting
}

export abstract class SharedListenerService<T> {

  private static nextServiceId: number = 0

  public readonly serviceId: number = SharedListenerService.nextServiceId++
  private state: State = State.Disconnected
  private nextId: number = 0
  private listeners: { [id: number]: Listener<T> } = {}
  private oneTimeListeners: Listener<T>[] = []
  private lastValue: T | undefined
  private connectingTimeout: any | undefined
  private disconnectingTimeout: any | undefined
  protected disconnectDelay: number = 1000

  protected abstract connect(): void
  protected abstract disconnect(): void

  protected onData(data: T): void {
    if (this.state === State.Disconnected) {
      console.warn(`Triggered onData cycle for unitialized SharedListenerService. Cleanup didn't happen properly.`)
    }
    this.lastValue = data
    Object.values(this.listeners).forEach(l => l(data))
    // Always trigger the one time listeners last
    this.oneTimeListeners.forEach(l => l(data))
    this.oneTimeListeners = []
  }

  subscribe(listener: Listener<T>): Unsubscribe {
    const id = this.nextId++
    this.listeners[id] = listener

    switch (this.state) {
      // When disconnected, start connecting (asyncronously)
      case State.Disconnected:
        this.connectingTimeout = setTimeout(() => {
          this.connect()
          this.state = State.Connected
          this.connectingTimeout = undefined
        })
        this.state = State.Connecting
        break

      case State.Connecting:
        // While connecting, don't need to do anything because we know the first onData hasn't happened yet
        break

      case State.Connected:
        // If connected, asyncronously send the last known value
        setTimeout(() => this.lastValue && listener(this.lastValue))
        break

      case State.Disconnecting:
        // If disconnecting, cancel the disconnection timer, update state, and then asynchronously send the last known value
        clearTimeout(this.disconnectingTimeout)
        this.state = State.Connected
        setTimeout(() => this.lastValue && listener(this.lastValue))
        break
    }

    const unsub = (() => { this.unsubscribe(id) }) as any
    unsub.id = id
    return unsub
  }

  unsubscribe(id: number | undefined): void {
    if (typeof id === 'undefined') { return }

    delete this.listeners[id]
    const isEmpty = Object.keys(this.listeners).length === 0

    // If somehow unsubscribed before we ever connected, just cancel connection
    if (isEmpty && this.state === State.Connecting) {
      clearTimeout(this.connectingTimeout)
      this.state = State.Disconnected
    } else if (isEmpty && this.state === State.Connected) {
      this.disconnectingTimeout = setTimeout(() => {
        this.disconnect()
        this.state = State.Disconnected
        this.disconnectingTimeout = undefined
        this.lastValue = undefined
      })
      this.state = State.Disconnecting
    }
  }

  oneTime(listener: Listener<T>): void {
    if (this.state === State.Connected && this.lastValue) {
      listener(this.lastValue)
    } else {
      this.oneTimeListeners[this.nextId++] = listener
    }
  }

  get debug(): string {
    return `[state=${this.state}, listenerCount=${Object.keys(this.listeners).length}, hasData=${!!this.lastValue}]`
  }
}

export abstract class SharedCollectionListenerService<T> extends SharedListenerService<{ [id: string]: T }> {

  private _unsub: FirebaseUnsubscribe | undefined

  constructor(readonly db: Firestore, readonly path: string) { super() }

  connect(): void {
    const ref = collection(this.db, this.path)
    this._unsub = onSnapshot(ref, (snap) => {
      const collection: { [id: string]: T } = snap.docs.reduce((c, v) => ({...c, [v.id]: v.data()}), {})
      this.onData(collection)
    })
  }

  disconnect(): void {
    this._unsub?.()
  }
}

export abstract class SharedDocumentListenerService<T> extends SharedListenerService<T | undefined> {

  private _unsub: FirebaseUnsubscribe | undefined

  constructor(readonly db: Firestore, readonly path: string) { super() }

  connect(): void {
    const ref = doc(this.db, this.path)
    this._unsub = onSnapshot(ref, (snap) => {
      this.onData(snap.data() as T | undefined)
    })
  }

  disconnect(): void {
    this._unsub?.()
  }
}

export function useSharedHook<T, S>(service: SharedListenerService<T>, selector: (data: T) => S, deps?: any[]): S | undefined {
  const [ value, setValue ] = useState<S | undefined>()

  useEffect(
    () => service.subscribe((data) => setValue(selector(data))),
    deps ? [ service.serviceId, ...deps ] : [ service.serviceId ] // eslint-disable-line
  )

  return value
}
