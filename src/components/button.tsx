import { Button as MuiButton } from '@mui/material'
import { createStyles, withStyles, WithStyles } from '@mui/styles'
import classNames from 'classnames'
import { FunctionComponent, PropsWithChildren } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const styles = createStyles({
  root: {
    fontSize: '18px',
    padding: '4px 22px !important',
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

const Button: FunctionComponent<PropsWithChildren<ButtonProps>> =
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
      muiProps.href = props.link
    } else if (props.link) {
      muiProps.component = RouterLink
      muiProps.to = props.link
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
      <MuiButton className={classes} {...muiProps}></MuiButton>
    )
  }

export default withStyles(styles)(Button)
