import { Box, Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { Button } from './Button'
import { Example } from './Example.design'

export const ButtonDesign: FunctionComponent<{}> =
  () => (
    <>
      <Typography variant="h1">Button</Typography>
      <Typography variant="body1">
        Primary UI component for user interaction. The intended use case is primary clickable buttons
        Used to draw attention to a call to action. This is the action that the user is supposed to take
        in order to resolve a task or actually do something. This isn't just navigation, it should feel
        like a decision. For example, use a primary button to "Join" a group but a menu item to navigate
        to the page about what groups might exist.
      </Typography>
      <Example>
        <Box>
          <Button size="large">Large Button</Button>
          <Button size="medium">Medium Button</Button>
          <Button size="small">Small Button</Button>
        </Box>
        <Box>
          <Button link="tel:8675309">Call Me</Button>
          <Button link=".">I'm a Link</Button>
          <Button cancel>Cancel</Button>
        </Box>
      </Example>
    </>
  )

