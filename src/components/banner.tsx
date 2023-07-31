import { Icon, IconButton, SwipeableDrawer } from '@mui/material'
import { Entry, EntryFields } from 'contentful'
import moment from 'moment'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ContentfulRichText } from '../contentful/rich-text'
import { useQueryOne } from '../services/contentful'
import { BCBox } from './box'

interface BannerData {
  name: string
  active: boolean
  start?: string
  end?: string
  content: EntryFields.RichText
  persistent?: boolean
}

function useActiveBanner(forceOpen: boolean, init?: Entry<BannerData>): BannerData | undefined {
  return useQueryOne(
    { content_type: 'banner', 'fields.active': true },
    init,
    (collection) => {
      if (forceOpen) {
        return collection?.items?.[0]
      } else {
        const now = moment()
        return collection?.items?.find(({ fields: b }) => {
          return (!b.start || moment(b.start).isBefore(now)) && (!b.end || moment(b.end).isAfter(now))
        })
      }
    }
  ).data
}

export type Props = {
  forceOpen?: boolean
  preloadedEntry?: Entry<BannerData>
}

export const Banner: FunctionComponent<Props> =
  ({ forceOpen, preloadedEntry }) => {
    const initialized = useRef(false)
    const [ open, setOpen ] = useState(!!forceOpen)
    const data = useActiveBanner(!!forceOpen, preloadedEntry)
    const location = useLocation()

    /* Re-display on each location change */
    useEffect(() => {
      setOpen(!!data?.persistent)
    }, [location, data])

    if (!data) { return null }

    if (!open && !initialized.current) {
      initialized.current = true
      setOpen(true)
    }

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
          <ContentfulRichText content={data.content} />
        </BCBox>
      </SwipeableDrawer>
    )
  }
