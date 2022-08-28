import { FunctionComponent, PropsWithChildren } from 'react'
import classNames from 'classnames';

import { createStyles, makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => createStyles({
  section: {
    width: '95%',
    maxWidth: '840px',
    margin: '20px auto'
  },
  'wide-section': {
    width: '95%',
    margin: '20px auto'
  }
}))

export type BoxProps = {
  className?: string
  variant?: 'section' | 'wide-section'
}

export const Box: FunctionComponent<PropsWithChildren<BoxProps>> =
  ({ className, variant, children }) => {
    const classes = useStyles()
    const cname = classNames(className, classes[variant || 'section'])

    return (<div className={cname}>{children}</div>)
  }
