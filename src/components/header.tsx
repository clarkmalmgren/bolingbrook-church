import React from 'react'
import { createStyles, withStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import Button from './button'
import Nav from './nav'
import { Hamburger } from './hamburger'

import LogoWhiteLarge from '../assets/images/logo-white-large.png'
import LogoWhiteLargeText from '../assets/images/logo-white-large-text.png'

interface HeaderProps {
  shade?: number
  height?: string
  background?: string
  classes?: any
}

interface HeaderState {
  opened: boolean
  height: string
  mobile: boolean
  clickCount: number
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 12px',
    backgroundColor: theme.palette.primary.dark,
    left: '0',
    right: '0',
    height: '50px',
    top: '0'
  },
  
  logo: {
    flex: 1,
    color: 'white',
    display: 'flex',
    alignItems: 'center',

    '& .icon': {
      height: '45px'
    },

    '& .text': {
      marginLeft: '12px',
      height: '25px'
    }
  },

  links: {
    display: 'flex',
    flex: 'auto',
    justifyContent: 'center',

    [theme.breakpoints.down('md')]: {
      display: 'none'
    },

    '& a': {
      padding: '0 8px'
    }
  },

  linkButton: {
    color: 'white'
  },

  hamburger: {
    flex: '1',
    textAlign: 'right',
    zIndex: 1400
  }

})

class Header extends React.PureComponent<HeaderProps, HeaderState> {
  
  static defaultProps: HeaderProps = {
    shade: 0.4,
    height: "98px"
  }

  constructor(props: HeaderProps) {
    super(props)

    this.state = {
      opened: false,
      mobile: false,
      height: '98px',
      clickCount: 0
    }
  }

  toggle = (open: boolean) => { this.setState(() => ({ opened: open })) }

  onHomeClick = () => {
    this.setState({ clickCount: this.state.clickCount + 1 })
  }

  render() {
    if (this.state.clickCount > 10) {
      return (<Redirect to="/admin/login" />)
    } else {
      return (
        <header className={this.props.classes.root}>
          <Link className={this.props.classes.logo} to="/" onClick={this.onHomeClick}>
            <img className="icon" src={LogoWhiteLarge} alt="Home" />
            <img className="text" src={LogoWhiteLargeText} />
          </Link>

          <nav className={this.props.classes.links}>
            <Button className={this.props.classes.linkButton} variant="text" link="/about">Our Story</Button>
            <Button className={this.props.classes.linkButton} variant="text" link="/connect">Connect</Button>
            <Button className={this.props.classes.linkButton} variant="text" link="/sermons">Sermons</Button>
            <Button className={this.props.classes.linkButton} variant="text" link="/giving">Giving</Button>
            <Button className={this.props.classes.linkButton} variant="text" link="/location">Location</Button>
          </nav>

          <Hamburger className={this.props.classes.hamburger} active={this.state.opened} onToggle={this.toggle}></Hamburger>

          <Nav opened={this.state.opened} onToggle={this.toggle} ></Nav>
        </header>
      )
    }
  }
}

export default withStyles(styles)(Header)
