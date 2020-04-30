import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import React, { FunctionComponent } from 'react'
import Isomorphic from './isomorphic'

const styles = createStyles({
  frame: {
    width: '100%',
    height: '100%'
  }
})

interface Props extends WithStyles<typeof styles> {
  id: string
  aspectRatio?: number
  className?: string
}

const UnstyledYoutube: FunctionComponent<Props> =
  (props) => {
    const aspectRatio = props.aspectRatio || (4 / 3)
    const url = `https://www.youtube.com/embed/${props.id}?enablejsapi=1`

    return (
      <Isomorphic aspectRatio={aspectRatio} maxWidth='800px'>
        <iframe title="Youtube Video" className={props.classes.frame} src={url} frameBorder="0" allowFullScreen={true} />
      </Isomorphic>
    )
  }

export default withStyles(styles)(UnstyledYoutube)
