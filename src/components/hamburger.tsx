import * as React from 'react'
import './hamburger.scss';

interface HamburgerProps {
  className?: string
  active?: boolean
  onToggle?: (active: boolean) => void
}

interface HamburgerState {
  active: boolean
}

export class Hamburger extends React.PureComponent<HamburgerProps, HamburgerState> {

  constructor(props: HamburgerProps) {
    super(props)
    this.state = { active : !!props.active }
  }

  componentWillReceiveProps(props: HamburgerProps) {
    if (this.state.active != props.active) {
      this.setState(() => ({ active: !!props.active }))
    }
  }

  toggle = () => {
    this.setState(state => {
      const active = !state.active
      if (this.props.onToggle) {
        this.props.onToggle(active)
      }
      return { active : active }
    })
  }

  getStatefulClassName = () => {
    return [
        this.props.className,
        'hamburger',
        'hamburger--spin',
        this.state.active ? 'is-active' : undefined
      ]
      .filter(c => !!c)
      .join(' ')
  }

  render() {
    return(
      <div className={this.getStatefulClassName()} onClick={this.toggle}>
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </div>
    )
  }
}