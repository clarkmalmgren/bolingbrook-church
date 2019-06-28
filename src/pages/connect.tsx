import * as React from 'react'
import { Redirect } from 'react-router'
import { Modal, Typography } from '@material-ui/core'
import Box from '../components/box'
import Page from '../components/page'
import Form, { FormConfig, Generator } from '../components/form'

const config: FormConfig = {
  _h1: Generator.header('Get Connected', 'h1'),
  _h2: Generator.header('Step 1: Tell us about yourself', 'h2'),
  
  first_name:  Generator.text('First Name', 'given-name', true),
  last_name:  Generator.text('Last Name', 'family-name', true),
  address:  Generator.text('Address', 'address-line1'),
  city:  Generator.text('City', 'address-level2'),
  state:  Generator.text('State', 'address-level1'),
  zipcode:  Generator.text('Zipcode', 'postal-code', false, 'number'),
  phone:  Generator.text('Phone Number', 'tel-national'),
  email:  Generator.text('Email', 'email'),

  _h3: Generator.header('Step 2: Get Involved', 'h2'),

  interests: Generator.checkboxes(
    'Learn more about following Jesus',
    'Learn more about our PreK-8 School',
    'Be Baptized',
    'Make Bolingbrook my home church'
  ),

  submit: Generator.submit()
}

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
