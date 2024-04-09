'use client'

import { ContentList } from '@/components/admin/ContentList'
import { MediaList } from '@/components/admin/MediaList'
import { Box, Tab, Tabs } from '@mui/material'
import { FunctionComponent, useState } from 'react'

export const EditorListPage: FunctionComponent<{}> =
  () => {
    const [ tab, setTab ] = useState(0)
    
    return (
      <>
        <Tabs value={tab} onChange={(e, t) => setTab(t)} sx={{ pl: 2, pr: 2, pt: 1 }}>
          <Tab label="Content" />
          <Tab label="Media" />
          <Tab label="Sermons" />
        </Tabs>
        { tab === 0 && <ContentList /> }
        { tab === 1 && <MediaList /> }
      </>
    )
  }

export default EditorListPage
