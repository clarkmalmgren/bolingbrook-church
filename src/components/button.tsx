import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import MuiButton from '@material-ui/core/Button'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import classNames from 'classnames';

const styles = createStyles({
  root: {
    fontSize: '18px',
    padding: '4px 22px',
    fontFamily: `'Roboto Condensed',sans-serif`,
    fontWeight: 400,
    
    '&.align-left': {
      textAlign: 'left',
      justifyContent: 'left'
    }
  }
})

export interface ButtonProps extends WithStyles<typeof styles> {
  disabled?: boolean
  fullWidth?: boolean
  mini?: boolean
  size?: 'small' | 'medium' | 'large'
  type?: string
  variant?: 'text' | 'flat' | 'outlined' | 'contained' | 'raised' | 'fab' | 'extendedFab'
  className?: string
  color?: 'inherit' | 'primary' | 'secondary' | 'default' | undefined
  
  align?: 'left' | 'center' | 'right'
  link?: string
}

class Button extends React.PureComponent<ButtonProps, {}> {

  constructor(props: ButtonProps) {
    super(props)
  }

  render() {
    const muiProps: any =
    {
      disabled: this.props.disabled,
      fullWidth: this.props.fullWidth,
      mini: this.props.mini,
      size: this.props.size,
      type: this.props.type,
      variant: this.props.variant,
      children: this.props.children,
      color: this.props.color
    }
    
    if (this.props.link && this.props.link.match(/^(https|http|tel):/)) {
      muiProps.component = (props: any) => (<a href={this.props.link} {...props}/>)
    } else if (this.props.link) {
      muiProps.component = (lp: LinkProps) => (<Link to={this.props.link} {...lp} />)
    }

    const classes =
      classNames(
        this.props.classes.root,
        {
          [`align-${this.props.align}`]: this.props.align,
          [`${this.props.className}`]: this.props.className,
        }
      )

    return (
      <MuiButton className={classes} {...muiProps}></MuiButton>
    )
  }
}

export default withStyles(styles)(Button)
