'use client'

import { DeleteContent } from '@/components/admin/DeleteContent'
import { ContentOverrides, useContentSearch } from '@/services/ContentService'
import { useCommitAllStagedContent, useStagedContentMap } from '@/services/StagedContentService'
import { Content } from '@/services/models/Content'
import { toDateString } from '@/services/utils/Dates'
import { Save } from '@mui/icons-material'
import { Badge, Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FunctionComponent, PropsWithChildren, useState } from 'react'
import { MutationButton } from '../MutationButton'
import { AddContent } from './AddContent'
import { TypeToName } from "./EditorTypeFields"

export const ContentList: FunctionComponent<{}> =
  () => {
    const [ search, setSearch ] = useState('')
    const { commit } = useCommitAllStagedContent()
    const overrides = useStagedContentMap()
    const stagedCount =  overrides ? Object.keys(overrides).length : 0
    const router = useRouter()
    const [ open, setOpen ] = useState(false)

    return (
      <ContentOverrides.Provider value={overrides || {}}>
        <Box display="flex" p={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search Content"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <AddContent onAdd={(id) => router.push(`/admin/content/${id}`)}/>
          <MutationButton
            color="secondary"
            variant="contained"
            disabled={!stagedCount}
            sx={{ m: 0 }}
            submit={commit}
            size="small"
          >
            <Badge badgeContent={stagedCount}>
              <Save />
            </Badge>
          </MutationButton>
        </Box>
        <InnerTable search={search} onClick={(c) => router.push(`/admin/content/${c.meta.id}`)} />
      </ContentOverrides.Provider>
    )
  }

const InnerTable: FunctionComponent<{search: string, onClick?: (c: Content) => void}> =
  ({ search, onClick }) => {
    const content = useContentSearch(search)

    if (!content) {
      return (
        <Box height="80vh" width="100%" textAlign="center">
          <CircularProgress sx={{ position: 'absolute', top: '50%' }} />
        </Box>
      )
    } else {
      return (
        <TableContainer sx={{ p: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell width={120}><b>Type</b></TableCell>
                <LTC h w>Author</LTC>
                <LTC h  >Created</LTC>
                <LTC h w>Modified By</LTC>
                <LTC h  >Updated</LTC>
                <TableCell width={1} />
              </TableRow>
            </TableHead>
            <TableBody>
              {content.map(c => (
                <TableRow key={c.meta.id} hover role="link" onClick={() => onClick?.(c) } sx={{ cursor: 'pointer' }}>
                  <TableCell>{c.meta.name}</TableCell>
                  <TableCell>{TypeToName[c.meta.type]}</TableCell>
                  <LTC>{c.meta.author}</LTC>
                  <LTC>{toDateString(c.meta.created)}</LTC>
                  <LTC>{c.meta.updated_by}</LTC>
                  <LTC>{toDateString(c.meta.updated)}</LTC>
                  <TableCell><DeleteContent content={c} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
    }
  }

export const LTC: FunctionComponent<PropsWithChildren<{h?: boolean, w?: boolean}>> =
  ({ h, w, children }) => {
    const c = h ? <b>{ children }</b> : children
    
    return (
      <TableCell
        width={ h ? (w ? 180 : 150) : undefined }
        sx={{ display: { xs: 'none', lg: 'table-cell' } }}
      >
        { c }
      </TableCell>
    )
  }
