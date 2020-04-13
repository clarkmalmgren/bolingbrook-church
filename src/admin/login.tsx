import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import { Card, Typography, CardContent, CardActions, CardMedia } from '@material-ui/core'
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { GoogleToken } from '../store/auth/token'
import { save } from '../store/auth/actions'
import { authSelectors } from '../store/index'
import { Redirect } from 'react-router'
import { TruthyOption } from '../utils/option'

const styles = createStyles({
  card: {
    margin: '12px auto',
    maxWidth: '300px',
  },

  image: {
    height: '100px'
  },

  login: {
    margin: '0 auto 10px'
  }
})

interface LoginProps extends WithStyles<typeof styles> {
  loggedIn: boolean
  onSuccess: (token: GoogleToken) => void
}

class Login extends React.PureComponent<LoginProps, {}> {

  readonly redirectTo: string =
    TruthyOption(window.location.hash).map(_ => _.substr(1)).getOrElse("/admin")

  onSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const resp = response as GoogleLoginResponse
    const auth = resp.getAuthResponse()
    const profile = resp.getBasicProfile()
    const token = {
      accessToken: auth.access_token,
      tokenId: auth.id_token,
      expiresAt: auth.expires_at,

      googleId: profile.getId(),
      email: profile.getEmail(),
      name: profile.getName(),
    }

    this.props.onSuccess(token)
  }

  onFailure = (response: any) => {
    console.log(response);
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <Redirect to={this.redirectTo} />
      )
    } else {
      return (
        <Card className={this.props.classes.card}>
          <CardMedia className={this.props.classes.image} image="https://www.blakleysflooring.com/wp-content/uploads/2016/03/Placeholder-768x768.png" />
          <CardContent>
            <Typography variant="h2">Login</Typography>
            <Typography>
              Login using your Google credentials to manage listed sermons and
              connect to Youtube assets.
            </Typography>
          </CardContent>
          <CardActions >
            <GoogleLogin
              className={this.props.classes.login}
              clientId={process.env.REACT_APP_OAUTH_CLIENT_ID as string}
              onSuccess={this.onSuccess}
              onFailure={this.onFailure}
              cookiePolicy={'single_host_origin'}
            />
          </CardActions>
        </Card>
      )
    }
  }
}

const mapStateToProps = (state: any) => ({ loggedIn: authSelectors.loggedIn(state)() })

const mapDispatchToProps = (dispatch: Dispatch) =>
  ({ onSuccess: (token: GoogleToken) => dispatch(save(token)) })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))