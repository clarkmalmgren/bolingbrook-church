import * as React from 'react'
import { SecurePage } from './secure-page';
import Button from '../components/button';

export const AdminPage: React.FunctionComponent<{}> =
  (props) => (
    <SecurePage>
      <Button link="/admin/sermons">Edit Sermons</Button>
    </SecurePage>
  )
