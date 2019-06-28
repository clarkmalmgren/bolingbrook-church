import * as React from 'react'
import { Redirect } from 'react-router'
import { Modal, Typography } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import Box from '../components/box'
import Content from '../components/content'
import Hero from '../components/hero'
import Page from '../components/page'
import Form, { FormConfig, Generator } from '../components/form'

const config: FormConfig = {
  _h1: Generator.header('Register Here', 'h2'),
  
  first_name:  Generator.text('First Name', 'given-name', true),
  last_name:  Generator.text('Last Name', 'family-name', true),
  phone:  Generator.text('Phone Number', 'tel-national'),
  email:  Generator.text('Email', 'email'),

  _h3: Generator.header('Choose a Team', 'h2'),

  interests: Generator.checkboxes(
    'Ask Me Anything Guide',
    'Next Steps Team',
    'Greeter',
    'Usher',
    'Audio Team',
    'Video Team',
    'Visual & Lighting Team'
  ),

  submit: Generator.submit()
}

const styles = createStyles({
  header: {
    color: 'white'
  }
})

interface ServeState {
  submitted: boolean
  failed: boolean
}

class Serve extends React.PureComponent<WithStyles<typeof styles>, ServeState> {

  state = {
    submitted: false,
    failed: false
  }

  submit = (data: any) => {
    fetch(`${process.env.REACT_APP_API_URL}/serve`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(() => this.setState({ submitted: true }))
    .catch(() => {
      this.setState({ failed: true })
      setTimeout(() => {
        this.setState({ failed: false })
      }, 1000)
    })
  }

  render() {
    return this.state.submitted ?
      (<Redirect to="/thank-you" />) :
      (
        <Page>
          <Hero cdnImage="1HhVFyX6nDz41jR7NaqYsx" height={0.3} shade={0.4}>
            <Typography className={this.props.classes.header} variant="h1">Serve</Typography>
          </Hero>
          <Content name="Serve" />
          <Form config={config} onsubmit={this.submit}/>
          
          <Modal open={this.state.failed} onClose={() => this.setState({ failed: false })}>
            <Box>
              <Typography variant="h2">Failed to Submit</Typography>
              <Typography>
                Please try again. Sorry for the inconvenience.
              </Typography>
            </Box>
          </Modal>
        </Page>
      )
  }
}

export default withStyles(styles)(Serve)