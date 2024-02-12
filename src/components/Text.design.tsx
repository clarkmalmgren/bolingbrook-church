import { Typography, TypographyVariant } from '@mui/material'
import { FunctionComponent } from 'react'
import { Example } from './Example.design'

const Lorem: FunctionComponent<{ words: number, variant: TypographyVariant }> =
  ({ words, variant }) => (
    <Typography variant={variant} gutterBottom>
      {variant}.&nbsp;
      {`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
        neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
        quasi quidem quibusdam.`
        .split('\n')
        .map(s => s.trim())
        .join(' ')
        .split(' ')
        .slice(0, words)
        .join(' ')
      }
    </Typography>
  )

export const TextDesign: FunctionComponent<{}> =
  () => (
    <>
      <Typography variant="h1">Text</Typography>
      <Typography>
        Below are the various text design components. These are made up of headers (h1-h6) where h1 is the largest and
        body text. This also shows bold and italic fonts. The font is Metropolis.
      </Typography>
      <Example>
        <Lorem variant="h1" words={2} />
        <Lorem variant="h2" words={2} />
        <Lorem variant="h3" words={2} />
        <Lorem variant="h4" words={2} />
        <Lorem variant="h5" words={2} />
        <Lorem variant="h6" words={2} />
        <Lorem variant="subtitle1" words={11} />
        <Lorem variant="subtitle2" words={11} />
        <Lorem variant="body1" words={30} />
        <Lorem variant="body2" words={30} />
        <Typography variant="button" display="block" gutterBottom>button text</Typography>
        <Typography variant="caption" display="block" gutterBottom>caption text</Typography>
        <Typography variant="overline" display="block" gutterBottom>overline text</Typography>
      </Example>
    </>
  )

