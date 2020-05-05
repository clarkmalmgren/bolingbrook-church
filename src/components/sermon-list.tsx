import { createStyles, Divider, Paper, WithStyles } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { withStyles } from '@material-ui/styles'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import SermonCard from '../components/sermon-card'
import { Sermon } from '../models/sermon'
import { sermonSelectors } from '../store/index'
import { load } from '../store/sermons/actions'
import Box from './box'

const styles = createStyles({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
  },

  pagination: {
    flex: '0 auto',
    margin: '10px',
    alignSelf: 'center'
  },

  spacer: {
    flex: '1 1',
    minWidth: '1px'
  },

  divider: {
    flex: '100%'
  }
})

interface Props extends WithStyles<typeof styles> {
  sermons?: Sermon[]
  onLoad?: () => void
  linkRoot?: string
  all?: boolean
}

const PAGE_SIZE = 9

const SermonList: FunctionComponent<Props> =
  ({ sermons, onLoad, linkRoot, classes }) => {
    const [page, setPage] = useState(1)
    useEffect(() => { if (onLoad) { onLoad() } }, [onLoad])

    const pageCount = sermons ? Math.ceil(sermons.length / PAGE_SIZE) : 0
    const start = (page - 1) * PAGE_SIZE
    const visibleSermons = (sermons || []).slice(start, start + PAGE_SIZE)

    const selectPage = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value)
    }

    return (
      <Box variant="wide-section">
        <Paper className={classes.root}>
          { visibleSermons.map(s => (<SermonCard sermon={s} key={s.date} linkRoot={linkRoot || '/sermons'}/>)) }

          <Divider className={classes.divider} />
          <div className={classes.spacer} />
          <Pagination className={classes.pagination} count={pageCount} page={page} onChange={selectPage} />
        </Paper>
      </Box>
    )
  }

const mapStateToProps = (state: any, ownState: Props) => {
  const selector = ownState.all ? sermonSelectors.all : sermonSelectors.published
  return {
    sermons: selector(state)()
  }
}

function mapDispatchToProps(dispatch: Dispatch): any {
  return {
    onLoad: () => {
      dispatch(load())
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SermonList))
