import React from 'react'
import { Button } from '../button/button'

interface NavProps {
  opened?: boolean
  onToggle?: (active: boolean) => void
}

interface NavState {
  opened: boolean
}

export class Nav extends React.PureComponent<NavProps, NavState> {

  constructor(props: NavProps) {
    super(props)
    this.state = { opened: !!props.opened}
  }

  componentWillReceiveProps(props: NavProps) {
    if (this.state.opened != props.opened) {
      this.setState(() => ({ opened: !!props.opened }))
    }
  }

  handleClick = () => {
    this.setState(state => {
      const opened = !state.opened
      if (this.props.onToggle) {
        this.props.onToggle(opened)
      }
      return { opened : opened }
    })
  }

  render() {
    return (
      <nav className={"bc-menu" + (this.state.opened ? " bc-menu__open" : "")} onClick={this.handleClick}>
        <div className="drop-content">
          <Button variant="text" fullWidth={true} align="left" link="/">Home</Button>
          <Button variant="text" fullWidth={true} align="left" link="/about">Our Story</Button>
          <Button variant="text" fullWidth={true} align="left" link="/connect">Get Connected</Button>
          <Button variant="text" fullWidth={true} align="left" link="/sermons">Sermons</Button>
          <Button variant="text" fullWidth={true} align="left" link="/giving">Giving</Button>
          <Button variant="text" fullWidth={true} align="left" link="/locations">Locations</Button>

          <div className="space"></div>

          <Button variant="text" fullWidth={true} align="left" size="small" link="/serve">Serve</Button>
          <Button variant="text" fullWidth={true} align="left" size="small" link="/newsletter">Newsletter Sign-up</Button>
          <Button variant="text" fullWidth={true} align="left" size="small" link="/family-friends-sabbath">Family &amp; Friends Sabbath</Button>
        </div>
      </nav>
    )
  }
}