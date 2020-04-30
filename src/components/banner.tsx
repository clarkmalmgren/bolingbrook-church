import { Icon, IconButton, SwipeableDrawer } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import { Entry, EntryFields } from 'contentful'
import moment from 'moment'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { ContentfulRichText } from '../contentful/rich-text'
import { client } from '../services/contentful'
import { Option } from '../utils/option'
import Box from './box'
import { useLocation } from 'react-router'

const styles = createStyles({
  root: {
    textAlign: 'center',
    zIndex: '1600 !important' as any
  },
  close: {
    position: 'absolute',
    top: '0px',
    right: '0px'
  }
})

interface BannerProps extends WithStyles<typeof styles>{
}

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

const UnstyledBanner: FunctionComponent<BannerProps> =
  ({classes}) => {
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
      <SwipeableDrawer className={classes.root} anchor="top" open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} >
        <IconButton className={classes.close} onClick={() => setOpen(false)}><Icon>close</Icon></IconButton>
        <Box variant="section" >
          <ContentfulRichText content={entry.fields.content} />
        </Box>
      </SwipeableDrawer>
    )
  }

export default withStyles(styles)(UnstyledBanner)
