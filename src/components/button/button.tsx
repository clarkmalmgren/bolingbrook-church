import React from 'react'
import MuiButton from '@material-ui/core/Button'
import { Link, LinkProps } from 'react-router-dom'
import classNames from 'classnames';

interface ButtonProps {
  disabled?: boolean
  fullWidth?: boolean
  mini?: boolean
  size?: 'small' | 'medium' | 'large'
  type?: string
  variant?: 'text' | 'flat' | 'outlined' | 'contained' | 'raised' | 'fab' | 'extendedFab'
  className?: string
  
  align?: 'left' | 'center' | 'right'
  link?: string
}

export class Button extends React.PureComponent<ButtonProps, {}> {

  classes: string

  constructor(props: ButtonProps) {
    super(props)

    this.classes =
      classNames("bc-button", {
        [`bc-button-${props.align}`]: props.align,
        [`${props.className}`]: props.className
      })
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
      children: this.props.children
    }
    
    if (this.props.link) {
      muiProps.component = (lp: LinkProps) => (<Link to={this.props.link} {...lp} />)
    }

    return (
      <MuiButton className={this.classes} {...muiProps} ></MuiButton>
    )
  }
}