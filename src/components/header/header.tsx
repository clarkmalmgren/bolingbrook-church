import React from 'react'
import { Button } from '../button/button'
import { Link } from 'react-router-dom'
import { Nav } from '../nav/nav'
import { Hamburger } from '../hamburger/hamburger'
import { HeaderHeightProp, parseHeaderHeight } from './header-height'
import { VideoSource } from './video-source'

import LogoWhiteLarge from '../../assets/images/logo-white-large.png'
import LogoWhiteLargeText from '../../assets/images/logo-white-large-text.png'

interface HeaderProps {
  shade?: number
  height?: string
  background?: string
  videoSources?: VideoSource[]
}

interface HeaderState {
  opened: boolean
  height: string
  mobile: boolean
}


export class Header extends React.PureComponent<HeaderProps, HeaderState> {

  static defaultProps: HeaderProps = {
    shade: 0.4,
    height: "98px"
  }

  headerHeight: HeaderHeightProp

  constructor(props: HeaderProps) {
    super(props)
    
    this.headerHeight = parseHeaderHeight(props.height + '')

    this.state = {
      opened: false,
      mobile: false,
      height: this.headerHeight.styleHeight()
    }
  }

  toggle = (open: boolean) => { this.setState(() => ({ opened: open })) }

  updateHeight = () => {
    this.setState((state) => ({ height: this.headerHeight.styleHeight() }))
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateHeight)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateHeight)
  }

  background() {
    if (this.props.videoSources && !this.state.mobile) {
      return (
        <video autoPlay loop>
          { this.props.videoSources.map((s) => <source key={s.url} src={s.url} type={s.type} />) }
        </video>
      )
    } else if (this.props.background) {
      const style = { backgroundImage: `url('${this.props.background}')` }
      console.log(style)
      return (<div className="mobile-bg" style={style}></div>)
    }
  }

  render() {
    const assetStyles = { height: this.state.height }
    const contentStyle = { backgroundColor: `rgba(0,0,0,${this.props.shade})` }

    return (
      <div>
        <header className="bc-header">
          <Link className="logo" to="/">
            <img src={LogoWhiteLarge} alt="Home" />
            <img className="text" src={LogoWhiteLargeText} />
          </Link>

          <nav className="quick-links">
            <Button variant="text" link="/about">Our Story</Button>
            <Button variant="text" link="/connect">Connect</Button>
            <Button variant="text" link="/messages">Sermons</Button>
            <Button variant="text" link="/giving">Giving</Button>
            <Button variant="text" link="/locations">Locations</Button>
          </nav>

          <div className="full-menu">
            <Hamburger active={this.state.opened} onToggle={this.toggle}></Hamburger>
          </div>

          <Nav opened={this.state.opened} onToggle={this.toggle} ></Nav>
        </header>

        <div className="bc-header__media-asset" style={assetStyles}>
        
          {this.background()}

          <div className="content" style={contentStyle}>
            {this.props.children}
          </div>
          
        </div>
      </div>
    )
  }
}