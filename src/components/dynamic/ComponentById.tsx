'use client'

import { useAllContent, useContent } from '@/services/ContentService'
import { useMediaMap } from '@/services/MediaService'
import { useDetectLoop } from '@/services/UseDetectLoop'
import { ContentMap } from '@/services/models/Content'
import { MediaRefMap } from '@/services/models/MediaRef'
import { PageSelector, TypeAndNameSelector } from '@/services/utils/ContentSelector'
import { Alert, Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { Section } from '../Section'
import { AutopadExclusions, DynamicComponent, Providers } from './DynamicComponent'

type Prefetch = {
  content: ContentMap
  media: MediaRefMap
}

export type ComponentByIdProps = {
  id: string
  autopad?: boolean
  prefetch?: Prefetch
}

export type ComponentBySelectorProps = {
  type: string
  name: string
  prefetch?: Prefetch
}

export type PageByPathProps = {
  path?: string[]
  prefetch?: Prefetch
}

export const ComponentById: FunctionComponent<ComponentByIdProps> =
  ({ id, autopad, prefetch }) => {
    useMediaMap(prefetch?.media)
    const content = useContent(id, prefetch?.content)
    const looped = useDetectLoop(id)

    if (!content) {
      return null
    } else if (looped) {
      return <Alert severity="warning">Loop Detected in Content Management System</Alert>
    }

    const child = Providers[content.meta.type]?.(content)

    if (!child) {
      return null
    } else if (autopad && !AutopadExclusions[content.meta.type]) {
      return <Section>{child}</Section>
    } else {
      return child
    }
  }


export const ComponentBySelector: FunctionComponent<ComponentBySelectorProps> =
  ({ type, name, prefetch }) => {
    useMediaMap(prefetch?.media)
    const all = useAllContent(prefetch?.content)

    const content = all?.find(TypeAndNameSelector(type, name))
    return content ? Providers[content.meta.type](content) : null
  }

export const PageByPath: FunctionComponent<PageByPathProps> =
  ({ path, prefetch }) => {
    useMediaMap(prefetch?.media)
    const all = useAllContent(prefetch?.content)
    if (!all) { return null }
    const found = all.find(PageSelector(path))

    if (found) {
      return <DynamicComponent content={found} />
    } else {
      return (
        <Section sx={{ pt: 4 }}>
          <Typography variant="h1">Oops! That page can’t be found.</Typography>
          <Typography>
            It looks like nothing was found at this location. Maybe try one of the links from the menu.
            Let&apos;s take this as a moment to reflect that this error and all errors in our lives are forgiven,
            paid for, and covered by the grace of Our Lord, Jesus Christ.
          </Typography>
        </Section>
      )
    }
  }