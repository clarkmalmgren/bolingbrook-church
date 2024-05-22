import { initializeApp } from 'firebase-admin'

let initialized = false

export function init() {
  if (!initialized) {
    initializeApp()
    initialized = true
  }
}
