import { FunctionComponent, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { ErrorDialog } from '../components/error'
import { ContentfulHero } from '../contentful/hero'
import { ContentfulSection } from '../contentful/section'
import { Checkboxes, CheckboxOption, Form, Header, Submit, TextField } from '../forms'

export const Serve: FunctionComponent<{}> =
  () => {
    const [ submitted, setSubmitted ] = useState(false)
    const [ failed, setFailed ] = useState(false)

    const submit = (data: any) => {
      // If there is an "other" selected, add it to interests
      if (data.other) {
        data.interests = [...data.interests, data.other]
      }

      fetch(`${process.env.REACT_APP_API_URL}/serve`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(() => setSubmitted(true))
      .catch(() => setFailed(true))
    }

    return submitted ?
      (<Navigate to="/thank-you" />) :
      (
        <div>
          <ContentfulHero name="serve" />
          <ContentfulSection type="contentSection" name="Serve" />

          <Form onSubmit={submit}>
            <Header variant="h2">Register Here</Header>
  
            <TextField id="first_name" autoComplete="given-name" required>First Name</TextField>
            <TextField id="last_name" autoComplete="family-name" required>Last Name</TextField>
            <TextField id="phone" autoComplete="tel-national" required>Phone Number</TextField>
            <TextField id="email" autoComplete="email">Email</TextField>
  
            <Header variant="h2">Choose a Team</Header>
  
            <Checkboxes id="interests">
              <CheckboxOption>Greeter</CheckboxOption>
              <CheckboxOption>Media</CheckboxOption>
              <CheckboxOption>Prayer Team</CheckboxOption>
              <CheckboxOption>Sabbath Cafe</CheckboxOption>
              <CheckboxOption>Safety Officer (ages 21+)</CheckboxOption>
              <CheckboxOption>Associate Safety Officer (ages 18-21)</CheckboxOption>
              <CheckboxOption>Junior Safety Officer (ages 16-18)</CheckboxOption>
              <CheckboxOption>Usher</CheckboxOption>
              <CheckboxOption>Connection Sabbath</CheckboxOption>
              <CheckboxOption>Serve Sabbath</CheckboxOption>
              <CheckboxOption>Discipletown</CheckboxOption>
            </Checkboxes>
            <TextField id="other">Other</TextField>
  
            <Submit>Submit</Submit>
          </Form>
          
          <ErrorDialog open={failed} onClose={() => setFailed(false)} />
        </div>
      )
  }