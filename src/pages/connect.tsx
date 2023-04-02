import { FunctionComponent } from 'react'
import { Checkboxes, Form, Header, Submit, TextField } from '../forms'
import { submitConnect } from '../services/signup'

export const Connect: FunctionComponent<{}> =
  () => {
    return (
      <Form onSubmit={submitConnect}>
        <Header variant="h1">Get Connected</Header>
        <Header variant="h2">Step 1: Tell us about yourself</Header>

        <TextField name="first_name" required autoComplete="given-name" label="First Name" />
        <TextField name="last_name" required autoComplete="family-name" label="Last Name" />
        <TextField name="address" autoComplete="address-line1" label="Address" />
        <TextField name="city" autoComplete="address-level2" label="City" />
        <TextField name="state" autoComplete="address-level1" label="State" />
        <TextField name="zipcode" autoComplete="postal-code" type="number" label="Zipcode" />
        <TextField name="phone" autoComplete="tel-national" label="Phone Number" />
        <TextField name="email" autoComplete="email" label="Email" />

        <Header variant="h2">Step 2: Get Involved</Header>

        <Checkboxes name="interests" values={[
          'Learn more about following Jesus',
          'Be Baptized',
          'Make Bolingbrook my home church'
        ]} />

        <Submit>Submit</Submit>
      </Form>
    )
  }
