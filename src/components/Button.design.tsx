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
        <Typography variant="h4">Button Sizes</Typography>
        <Box>
          <Button size="large">Large Button</Button>
          <Button size="medium">Medium Button (default)</Button>
          <Button size="small">Small Button</Button>
        </Box>
        <Box>
          <Button fullWidth>Full Width Button</Button>
        </Box>

        <Typography variant="h4">Links</Typography>
        <Box>
          <Button link="tel:8675309">Call Me</Button>
          <Button link=".">I'm a Link</Button>
        </Box>

        <Typography variant="h4">Colors</Typography>
        <Box>
          <Button color="primary">Primary (default)</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="success">Success</Button>
          <Button color="error">Error</Button>
          <Button color="warning">Warning</Button>
          <Button color="info">Info</Button>
          <Button color="inherit">Inherit</Button>
        </Box>

        <Typography variant="h4">Variants</Typography>
        <Box>
          <Button variant="contained">Contained (default)</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
        </Box>

        <Typography variant="h4">Text Size</Typography>
        <Typography>Really should only be used with text buttons over a hero...</Typography>
        <Box>
          <Button textSize="h2">h2</Button>
          <Button textSize="h3">h3</Button>
          <Button textSize="h4">h4</Button>
        </Box>

        <Typography variant="h4">Text Color</Typography>
        <Typography>Really should only be used with text buttons over a hero...</Typography>
        <Box bgcolor="black">
          <Button variant="text" textSize="h2" textColor="white">White</Button>
          <Button variant="text" textSize="h2" textColor="secondary">Secondary</Button>
          <Button variant="text" textSize="h2" textColor="error">Error</Button>
        </Box>
      </Example>
    </>
  )

