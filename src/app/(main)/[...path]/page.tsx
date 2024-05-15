'use client'

import { DynamicComponent } from '@/components/DynamicComponent'
import { Loading } from '@/components/Loading'
import { Section } from '@/components/Section'
import { usePage } from '@/services/ContentService'
import { Typography } from '@mui/material'
import { FunctionComponent } from 'react'

type DynamicPageProps = {
  params: { path: string[] }
}

const DynamicPage: FunctionComponent<DynamicPageProps> =
  ({ params }) => {
    const { page, loading } = usePage(params.path)

    if (loading) {
      return <Loading />
    } else if (page) {
      return <DynamicComponent content={page} />
    } else {
      return (
        <Section sx={{ pt: 4 }}>
          <Typography variant="h1">Oops! That page can’t be found.</Typography>
          <Typography>
            It looks like nothing was found at this location. Maybe try one of the links from the menu.
            Let's take this as a moment to reflect that this error and all errors in our lives are forgiven,
            paid for, and covered by the grace of Our Lord, Jesus Christ.
          </Typography>
        </Section>
      )
    }
  }

export default DynamicPage
