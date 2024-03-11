'use client'

import { ContentList } from '@/components/admin/ContentList'
import { MediaList } from '@/components/admin/MediaList'
import { Box } from '@mui/material'
import { FunctionComponent } from 'react'

export const EditorListPage: FunctionComponent<{}> =
  () => {
    
    return (
      <Box display="flex" flexDirection="row" flexWrap="wrap" width="100%" >
        <ContentList />
        <MediaList />
      </Box>
    )
  }

export default EditorListPage
