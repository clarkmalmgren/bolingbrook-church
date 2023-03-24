import { Icon, IconButton, SwipeableDrawer } from '@mui/material'
import { Entry, EntryFields } from 'contentful'
import moment from 'moment'
import { FunctionComponent, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ContentfulRichText } from '../contentful/rich-text'
import { client } from '../services/contentful'
import { Option } from '../utils/option'
import { BCBox } from './box'

interface BannerData {
  name: string
  active: boolean
  start?: string
  end?: string
  content: EntryFields.RichText
  persistent?: boolean
}

let cached: Option<Entry<BannerData>> | undefined = undefined

function getActiveBanner(): Promise<Entry<BannerData> | undefined> {
  if (cached) {
    return Promise.resolve(cached.getOrUndefined())
  } else {
    return client
      .getEntries<BannerData>({ content_type: 'banner', 'fields.active': true })
      .then(collection => {
        const now = moment()
        const found = collection.items.find((e) => {
          const b = e.fields
          return (!b.start || moment(b.start).isBefore(now)) && (!b.end || moment(b.end).isAfter(now))
        })
        cached = Option(found)

        return found
      })
    }
}

export const Banner: FunctionComponent<{}> =
  () => {
    const [entry, setEntry] = useState<Entry<BannerData> | undefined>()
    const [open, setOpen] = useState(false)
    const location = useLocation()

    /* Download data */
    useEffect(() => {
      getActiveBanner().then(e => {
        setEntry(e)
        setOpen(!!e)
      })
    }, [])

    /* Re-display on each location change */
    useEffect(() => {
      setOpen(!!entry?.fields.persistent)
    }, [location, entry])

    if (!entry) { return null }

    return (
      <SwipeableDrawer
        sx={{
          textAlign: 'center',
          zIndex: '1600 !important'
        }}
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <IconButton sx={{position: 'absolute', top: '0px', right: '0px'}} onClick={() => setOpen(false)}>
          <Icon>close</Icon>
        </IconButton>
        <BCBox variant="section" >
          <ContentfulRichText content={entry.fields.content} />
        </BCBox>
      </SwipeableDrawer>
    )
  }

