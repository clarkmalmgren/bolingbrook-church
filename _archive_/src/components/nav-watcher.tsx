import { FunctionComponent, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* Component that watches for any location updates and then scrolls to the top smoothly */
export const NavWatcher: FunctionComponent<{}> =
  () => {
    const location = useLocation()
    useEffect(() => {
      window.scroll({ top: 0, behavior: 'smooth' })
    }, [location])

    return null
  }