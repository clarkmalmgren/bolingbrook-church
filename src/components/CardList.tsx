import { useContents } from '@/services/ContentService'
import { Box } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'
import { DynamicComponent } from './DynamicComponent'

export const CardList: FunctionComponent<PropsWithChildren<{}>> =
  ({ children }) => (
    <Box sx={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
      { children }
    </Box>
  )

export type CardListContentProps = {
  children?: string[]
}

export const CardListContent: FunctionComponent<CardListContentProps> =
  ({ children }) => {
    const childContents = useContents(children)

    return (
      <CardList>
        { childContents?.map(cc => <DynamicComponent content={cc} />) }
      </CardList>
    )
  }
