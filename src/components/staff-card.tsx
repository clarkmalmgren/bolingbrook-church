import { FunctionComponent } from 'react'
import { Card, CardHeader, CardMedia, CardContent, Link } from '@mui/material'
import { StaffInfo } from '../services/staff'

export type StaffCardProps = {
  info: StaffInfo
}

export const StaffCard: FunctionComponent<StaffCardProps> =
  ({ info }) => (
    <Card sx={{
      maxWidth: '300px',
      margin: '12px',
      flex: '100%',
      textDecoration: 'none'
    }}>
      <CardMedia image={ info.picture.fields.file.url } sx={{ height: 300 }} />
      <CardHeader title={info.name} subheader={info.title} />
      <CardContent>
        <Link href={`mailto:${info.email}`}>{info.email}</Link>
      </CardContent>
    </Card>
  )
