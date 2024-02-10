import { database } from 'firebase-admin'
import { init } from './firebase-init'
import { Sermon, parseSermons, isValidSermon } from '../models/sermon'

export async function getAllSermons(): Promise<Sermon[]> {
  init()
  const all = await database().ref('data/sermons_v2').once('value')
  return parseSermons(all.toJSON())
}

export async function saveSermon(sermon: Sermon): Promise<boolean> {
  if (!isValidSermon(sermon)) {
    return false
  }

  init()
  await database().ref(`data/sermons_v2/${sermon.date}`).set(sermon)
  return true
}