import { ButtonDesign } from '@/components/Button.design'
import { CardDesign } from '@/components/Card.design'
import { TextDesign } from '@/components/Text.design'
import { Box } from '@mui/material'
import { FunctionComponent } from 'react'

const DesignPage: FunctionComponent<{}> =
  () => (
    <Box sx={{ maxWidth: 1000, margin: '0 auto', p: 1 }}>
      <TextDesign />
      <ButtonDesign />
      <CardDesign />
    </Box>
  )

export default DesignPage
