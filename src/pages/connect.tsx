import * as React from 'react'
import { Redirect } from 'react-router'
import Page from '../components/page'
import { Form, TextField, Header, Checkboxes, CheckboxOption, Submit } from '../forms'
import { ErrorDialog } from '../components/error'

interface ConnectState {
  submitted: boolean
  failed: boolean
}

export default class Connect extends React.PureComponent<{}, ConnectState> {

  state = {
    submitted: false,
    failed: false
  }

  submit = (data: any) => {
    fetch(`${process.env.REACT_APP_API_URL}/connect`, {
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
          <Form onSubmit={this.submit}>
            <Header id="_h1" variant="h1">Get Connected</Header>
            <Header id="_h2" variant="h2">Step 1: Tell us about yourself</Header>

            <TextField id="first_name" required autoComplete="given-name">First Name</TextField>
            <TextField id="last_name" required autoComplete="family-name">Last Name</TextField>
            <TextField id="address" autoComplete="address-line1">Address</TextField>
            <TextField id="city" autoComplete="address-level2">City</TextField>
            <TextField id="state" autoComplete="address-level1">State</TextField>
            <TextField id="zipcode" autoComplete="postal-code" dataType="number">Zipcode</TextField>
            <TextField id="phone" autoComplete="tel-national">Phone Number</TextField>
            <TextField id="email" autoComplete="email">Email</TextField>

            <Header id="_h3" variant="h2">Step 2: Get Involved</Header>

            <Checkboxes id="interests">
              <CheckboxOption>Learn more about following Jesus</CheckboxOption>
              <CheckboxOption>Learn more about our PreK-8 School</CheckboxOption>
              <CheckboxOption>Be Baptized</CheckboxOption>
              <CheckboxOption>Make Bolingbrook my home church</CheckboxOption>
            </Checkboxes>

            <Submit>Submit</Submit>

          </Form>
          
          <ErrorDialog open={this.state.failed} onClose={() => this.setState({ failed: false })} />
        </Page>
      )
  }
}
