import { FunctionComponent } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { createStyles, makeStyles } from '@mui/styles'
import { Card, Typography, CardContent, CardActions, CardMedia } from '@mui/material'
import { GoogleToken } from '../store/auth/token'
import { save } from '../store/auth/actions'
import { authSelectors } from '../store/index'
import { Navigate, useLocation } from 'react-router-dom'
import { TruthyOption } from '../utils/option'
import { GoogleLogin } from '../components/google-login'


const useStyles = makeStyles(() => createStyles({
  card: {
    margin: '12px auto',
    maxWidth: '300px',
  },

  image: {
    height: '100px'
  },

  login: {
    margin: '0 auto 10px',
    backgroundColor: 'white'
  }
}))

type LoginProps = {
  loggedIn: boolean
  onSuccess: (token: GoogleToken) => void
}

const Login: FunctionComponent<LoginProps> =
  ({loggedIn, onSuccess}) => {
    const classes = useStyles()
    const hash = useLocation().hash

    const redirectTo: string = TruthyOption(hash).map(_ => _.substring(1)).getOrElse("/admin")

    const onFailure = (e: Error) => console.error(e)

    if (loggedIn) {
      return ( <Navigate to={redirectTo} /> )
    } else {
      return (
        <Card className={classes.card}>
          <CardMedia className={classes.image} image="https://www.blakleysflooring.com/wp-content/uploads/2016/03/Placeholder-768x768.png" />
          <CardContent>
            <Typography variant="h2">Login</Typography>
            <Typography>
              Login using your Google credentials to manage listed sermons and
              connect to Youtube assets.
            </Typography>
          </CardContent>
          <CardActions >
            <GoogleLogin className={classes.login} onSuccess={(token) => onSuccess(token)} onFailure={onFailure} />
          </CardActions>
        </Card>
      )
    }
  }

const mapStateToProps = (state: any) => ({ loggedIn: authSelectors.loggedIn(state)() })

const mapDispatchToProps = (dispatch: Dispatch) =>
  ({ onSuccess: (token: GoogleToken) => dispatch(save(token)) })

export default connect(mapStateToProps, mapDispatchToProps)(Login)
