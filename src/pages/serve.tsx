import { FunctionComponent } from 'react'
import { ContentfulHero } from '../contentful/hero'
import { ContentfulSection } from '../contentful/section'
import { Checkboxes, Form, Header, Submit, TextField } from '../forms'
import { ServeRequest, submitServe } from '../services/signup'

type FormServeRequest = ServeRequest & { other?: string }

export const Serve: FunctionComponent<{}> =
  () => {

    const submit = async (data: FormServeRequest) => {
      // If there is an "other" selected, add it to interests
      const { other, ...req } = data
      if (other) {
        req.interests = [...(req.interests || []), other]
      }

      await submitServe(req)
    }

    return (
      <>
        <ContentfulHero name="serve" />
        <ContentfulSection type="contentSection" name="Serve" />

        <Form onSubmit={submit} navOnSubmitted="/thank-you">
          <Header variant="h2">Register Here</Header>

          <TextField name="first_name" autoComplete="given-name" required label="First Name" />
          <TextField name="last_name" autoComplete="family-name" required label="Last Name" />
          <TextField name="phone" autoComplete="tel-national" required label="Phone Number" />
          <TextField name="email" autoComplete="email" label="Email" />

          <Header variant="h2">Choose a Team</Header>

          <Checkboxes
            name="interests"
            values={[
              'Greeter', 'Media', 'Prayer Team', 'Sabbath Cafe', 'Safety Officer (ages 21+)',
              'Associate Safety Officer (ages 18-21)', 'Junior Safety Officer (ages 16-18)',
              'Usher', 'Connection Sabbath', 'Serve Sabbath', 'Discipletown'
          ]} />
          <TextField name="other" label="Other" />

          <Submit>Submit</Submit>
        </Form>
      </>
    )
  }
