import React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import classNames from 'classnames'
import Isomorphic from './isomorphic'

const styles = createStyles({
  frame: {
    width: '100%',
    height: '100%'
  }
})

interface Props extends WithStyles<typeof styles> {
  id: string,
  className?: string
}

class Youtube extends React.PureComponent<Props, {}> {
  get url(): string {
    return `https://www.youtube.com/embed/${this.props.id}?enablejsapi=1`
  }

  render() {
    return (
      <Isomorphic aspectRatio={4/3} maxWidth='800px'>
        <iframe className={this.props.classes.frame} src={this.url} frameBorder="0" allowFullScreen={true} />
      </Isomorphic>
    )
  }
}

export default withStyles(styles)(Youtube)
