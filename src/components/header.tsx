import { FunctionComponent, useState, MouseEvent } from 'react'
import { Theme, AppBar, Toolbar, IconButton, Icon, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { Link, useNavigate } from 'react-router-dom'
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
      padding: '5px 12px !important',
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
      color: 'black !important'
    }

  }))

type Props = {}


export const Header: FunctionComponent<Props> =
  () => {
    const classes = useStyles()
    const theme = useTheme()
    const navigate = useNavigate()
    const [ opened, setOpened ] = useState(false)
    const [ clickCount, setClickCount ] = useState(0)
    
    const onHomeClick = (event: MouseEvent) => {
      if (clickCount >= 10) {
        event.preventDefault()
        navigate('/admin/login')
        setClickCount(0)
      } else {
        setClickCount(clickCount + 1)
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
            <IconButton onClick={() => setOpened(true)} sx={{ml: 1}}>
              <Icon>menu</Icon>
            </IconButton>
          </div>

          <Nav opened={opened} onToggle={setOpened} ></Nav>
        </Toolbar>
      </AppBar>
    )
  }

