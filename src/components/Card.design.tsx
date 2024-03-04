'use client'

import { Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { Card, CardList } from './Card'
import { Example } from './Example.design'
import { Lorem } from './Text.design'

const image = 'https://i1.pickpik.com/photos/892/256/948/remote-serene-natural-beauty-island-preview.jpg'

export const CardDesign: FunctionComponent<{}> =
  () => (
    <>
      <Typography variant="h1">Card</Typography>
      <Typography variant="body1">
        Used to represent a "thing". Usually there are more than one. For example, a sermon,
        a blog post, a get together, a mechanism for donating, etc.
      </Typography>
      <Example>
        <CardList>
          <Card image={image} title="Example">
            <Lorem words={30} />
          </Card>

          <Card title="No Image">
            <Lorem words={30} />
          </Card>

          <Card image={image} title="Clickable" onClick={() => window.alert('Well hello there')}>
            <Lorem words={30} />
          </Card>

          <Card image={image} title="Few Words">
            <Lorem words={10} />
          </Card>
        </CardList>
      </Example>
    </>
  )

