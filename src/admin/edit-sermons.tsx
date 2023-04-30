import { Fab, Icon } from '@mui/material'
import { FunctionComponent } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { SermonList } from '../components/sermon-list'
import { ContentfulHero } from '../contentful/hero'
import { SecurePage } from './secure-page'

export const EditSermons: FunctionComponent<{}> =
  () => {
    const fabProps: any = {
      component: (lp: LinkProps) => {
        const expandedProps = {...lp, to: '/admin/sermons/new'}
        return (<Link {...expandedProps} />)
      }
    }

    return (
      <SecurePage>
        <ContentfulHero name="sermons" />
        <SermonList linkRoot="/admin/sermons" />

        <Fab
          sx={{
            position: 'fixed',
            right: '20px',
            bottom: '20px'
          }}
          variant="extended"
          color="secondary"
          {...fabProps}
        >
          <Icon>add</Icon>
          New
        </Fab>
      </SecurePage>
    )
  }
