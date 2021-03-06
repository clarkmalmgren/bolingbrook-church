import React from 'react'
import { makeStyles } from '@material-ui/styles'
import classNames from 'classnames'
import Box from './box'

type TLength = string | 0

interface Props {
  className?: string
  maxWidth?: TLength
  aspectRatio: number
}

const styles = makeStyles({
  outer: (props: Props) => ({
    maxWidth: props.maxWidth
  }),
  inner: (props: Props) => ({
    width: '100%',
    paddingTop: `${100/props.aspectRatio}%`,
    position: 'relative'
  }),
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})

const Isomorphic: React.FunctionComponent<Props> = props => {
  const classes = styles(props)
  return (
    <Box className={classNames(classes.outer, props.className)}>
      <Box className={classes.inner}>
        <Box className={classes.content}> {props.children} </Box>
      </Box>
    </Box>
  )
}

export default Isomorphic

