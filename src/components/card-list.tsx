import React from 'react'
import { createStyles, withStyles } from '@material-ui/styles'

interface Props {
  classes?: any
}

const styles = createStyles({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
  }
})

class CardList extends React.PureComponent<Props, {}> {

  render() {
    return (
      <div className={this.props.classes.root}>
        { this.props.children }
      </div>
    )
  }
}

export default withStyles(styles)(CardList)
