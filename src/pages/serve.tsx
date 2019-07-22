import * as React from 'react'
import { Redirect } from 'react-router'
import { Typography } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import Content from '../components/content'
import Hero from '../components/hero'
import Page from '../components/page'
import { ErrorDialog } from '../components/error'
import { Form, Checkboxes, CheckboxOption, TextField, Header, Submit } from '../forms'

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
    .catch(() => this.setState({ failed: true }))
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

          <Form onSubmit={this.submit}>
            <Header variant="h2">Register Here</Header>
  
            <TextField id="first_name" autoComplete="given-name" required>First Name</TextField>
            <TextField id="last_name" autoComplete="family-name" required>Last Name</TextField>
            <TextField id="phone" autoComplete="tel-national" required>Phone Number</TextField>
            <TextField id="email" autoComplete="email">Email</TextField>
  
            <Header variant="h2">Choose a Team</Header>
  
            <Checkboxes id="interests">
              <CheckboxOption>Ask Me Anything Guide</CheckboxOption>
              <CheckboxOption>Next Steps Team</CheckboxOption>
              <CheckboxOption>Greeter</CheckboxOption>
              <CheckboxOption>Usher</CheckboxOption>
              <CheckboxOption>Audio Team</CheckboxOption>
              <CheckboxOption>Video Team</CheckboxOption>
              <CheckboxOption>Visual &amp; Lighting Team</CheckboxOption>
            </Checkboxes>
  
            <Submit>Submit</Submit>
          </Form>
          
          <ErrorDialog open={this.state.failed} onClose={() => this.setState({ failed: false })} />
        </Page>
      )
  }
}

export default withStyles(styles)(Serve)