import { https } from 'firebase-functions'
import { isAdmin } from './services/auth'
import { getAllSermons, saveSermon } from './services/sermons'

export const sermons = https.onRequest(async (req, res) => {

  // Get all Sermons
  if (req.method === 'GET') {
    const data = await getAllSermons()
    res.status(200).send(data)
  }
  
  // Save a new sermon
  else if (req.method === 'POST') {
    // Validate authorization
    const authd = await isAdmin(req.header('Authorization'))
    if (authd) {
      res.status(authd).send()
      return
    }

    const valid = await saveSermon(req.body)
    if (!valid) {
      res.status(400).send('Invalid sermon')
    } else {
      res.status(201).send('Saved!')
    }
  }

  // Unsupported method
  else {
    res.status(405).send('Method not allowed')
  }
})
