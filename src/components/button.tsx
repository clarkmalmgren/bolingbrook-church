import { Button as MuiButton } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const styles = createStyles({
  root: {
    fontSize: '18px',
    padding: '4px 22px',
    textDecoration: 'none',
    
    '&.align-left': {
      textAlign: 'left',
      justifyContent: 'left'
    }
  }
})

export interface ButtonProps extends WithStyles<typeof styles> {
  disabled?: boolean
  fullWidth?: boolean
  size?: 'small' | 'medium' | 'large'
  type?: string
  variant?: 'text' | 'flat' | 'outlined' | 'contained' | 'raised' | 'fab' | 'extendedFab'
  className?: string
  color?: 'inherit' | 'primary' | 'secondary' | 'default'
  
  align?: 'left' | 'center' | 'right'
  link?: string
}

const Button: FunctionComponent<ButtonProps> =
  (props) => {
    const muiProps: any =
    {
      disabled: props.disabled,
      fullWidth: props.fullWidth,
      size: props.size,
      type: props.type,
      variant: props.variant,
      children: props.children,
      color: props.color
    }
    
    if (props.link && props.link.match(/^(https|http|tel):/)) {
      muiProps.component = 'a'
    } else if (props.link) {
      muiProps.component = RouterLink
    }

    const classes =
      classNames(
        props.classes.root,
        {
          [`align-${props.align}`]: props.align,
          [`${props.className}`]: props.className,
        }
      )

    return (
      <MuiButton className={classes} to={props.link} href={props.link} {...muiProps}></MuiButton>
    )
  }

export default withStyles(styles)(Button)
