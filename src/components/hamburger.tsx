import classNames from 'classnames'
import React, { FunctionComponent, useState } from 'react'
import './hamburger.scss'

interface HamburgerProps {
  className?: string
  active?: boolean
  onToggle?: (active: boolean) => void
}

export const Hamburger: FunctionComponent<HamburgerProps> =
  (props) => {
    const [active, setActive] = useState(props.active)
    const [lastPropsActive, setLastPropsActive] = useState(props.active)
    
    if (props.active !== lastPropsActive) {
      setActive(props.active)
      setLastPropsActive(props.active)
    }

    function toggle() {
      setActive(!active)
      if (props.onToggle) {
        props.onToggle(!active)
      }
    }

    const className = classNames([
      props.className,
      'hamburger',
      'hamburger--spin',
      active ? 'is-active' : undefined
    ])

    return (
      <div className={className} onClick={() => toggle()}>
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </div>
    )
  }
