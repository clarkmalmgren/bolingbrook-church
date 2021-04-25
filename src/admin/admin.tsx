import { FunctionComponent } from 'react'
import { SecurePage } from './secure-page';
import Button from '../components/button';

export const AdminPage: FunctionComponent<{}> =
  () => (
    <SecurePage>
      <Button link="/admin/sermons">Edit Sermons</Button>
    </SecurePage>
  )
