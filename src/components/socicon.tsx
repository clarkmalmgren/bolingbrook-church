import React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import classNames from 'classnames'

const styles = createStyles({
  root: {
    fontFamily: `'Socicon' !important`,
    speak: 'none',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontVariant: 'normal',
    textTransform: 'none',
    lineHeight: 1,
    webkitFontSmoothing: 'antialiased',
    mozOsxFontSmoothing: 'grayscale',
    margin: '0 8px'
  }
})

export interface SociconProps extends WithStyles<typeof styles> {
  name: string
  className?: string
}

function lookup(key: string): number {
  switch (key) {
    case 'twitter':         return 0xe08d
    case 'instagram':       return 0xe044
    case 'facebook':        return 0xe028
    case 'youtube':         return 0xe0a5
    case 'apple':           return 0xe008
    case 'spotify':         return 0xe079
    case 'googleplaymusic': return 0xe95e
    default:
      try {
        return Number.parseInt(key, 16)
      } catch (e) {
        return 0x0000
      }
  }
}

class Socicon extends React.PureComponent<SociconProps, {}> {

  private classes = classNames(this.props.className, this.props.classes.root)

  render() {
    return (
      <div className={this.classes}>
        { String.fromCodePoint(lookup(this.props.name)) }
      </div>
    )
  }
}

export default withStyles(styles)(Socicon)
