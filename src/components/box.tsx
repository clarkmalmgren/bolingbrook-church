import * as React from 'react'
import classNames from 'classnames';

import { createStyles, withStyles } from '@material-ui/styles'

const styles = createStyles({
  main: {
    padding: '0 20px'
  },
  section: {
    width: '95%',
    maxWidth: '840px',
    margin: '20px auto'
  },
  'wide-section': {
    width: '95%',
    margin: '20px auto'
  }
})

export interface BoxProps {
  className?: string
  classes?: any
  variant: 'main' | 'section' | 'wide-section'
}

class Box extends React.PureComponent<BoxProps, {}> {

  static defaultProps: BoxProps = {
    variant: 'section'
  }

  private clazz: string = classNames(
    this.props.className,
    this.props.classes[this.props.variant]
  )

  render() {
    return (
      <div className={this.clazz}>
        {this.props.children}
      </div>
    )
  }
}

export default withStyles(styles)(Box)
