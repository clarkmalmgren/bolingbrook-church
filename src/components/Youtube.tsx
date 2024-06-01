import { FunctionComponent } from 'react'
import { Box } from '@mui/material'

type Props = {
  id: string
  aspectRatio?: number
  className?: string
}

export const Youtube: FunctionComponent<Props> =
  (props) => {
    const url = `https://www.youtube.com/embed/${props.id}?enablejsapi=1`

    return (
      <Box width="800px" height="400px" maxWidth="95%" maxHeight="50vw" mt={2} >
        <iframe
          title="Youtube Video"
          style={{ width: '100%', height: '100%' }}
          src={url}
          frameBorder="0"
          allowFullScreen={true} />
      </Box>
    )
  }
