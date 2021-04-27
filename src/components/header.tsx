import { FunctionComponent, useState, MouseEvent } from 'react'
import { createStyles, makeStyles, Theme, AppBar, Toolbar, IconButton, Icon, useTheme } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import Button from './button'
import Nav from './nav'
import { Logo } from '../assets/images/Logo'
import { TextLogo } from '../assets/images/TextLogo'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '5px 12px',
      backgroundColor: 'white',
      left: '0',
      right: '0',
      height: '50px',
      top: '0'
    },
    
    logo: {
      color: 'black',
      display: 'flex',
      alignItems: 'center',
      justifySelf: 'center',

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
      color: 'black'
    }

  }))

type Props = {}

export const Header: FunctionComponent<Props> =
  () => {
    const classes = useStyles()
    const theme = useTheme()
    const [ opened, setOpened ] = useState(false)
    const [ clickCount, setClickCount ] = useState(0)
    const history = useHistory()
    
    const onHomeClick = (event: MouseEvent) => {
      const next = clickCount + 1
      if (next >= 10) {
        history.push("/admin/login")
        event.preventDefault()
        setClickCount(0)
      } else {
        setClickCount(next)
      }
    }

    return (
      <AppBar position="relative" >
        <Toolbar className={classes.root}>
          <Link className={classes.logo} to="/" onClick={onHomeClick}>
            <Logo className="icon" color={theme.palette.primary.main} />
            <TextLogo className="text" color="black" />
          </Link>

          <nav className={classes.links}>
            <Button className={classes.linkButton} variant="text" link="/visit">Visit</Button>
            <Button className={classes.linkButton} variant="text" link="/sermons">Sermons</Button>
            <Button className={classes.linkButton} variant="text" link="/connect">Connect</Button>
          </nav>

          <div>
            <Button className={classes.linkButton} variant="contained" color="secondary" link="/giving">Give</Button>
            <IconButton onClick={() => setOpened(true)}>
              <Icon>menu</Icon>
            </IconButton>
          </div>

          <Nav opened={opened} onToggle={setOpened} ></Nav>
        </Toolbar>
      </AppBar>
    )
  }

