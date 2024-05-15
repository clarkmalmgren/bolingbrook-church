'use client'

import { ComponentBySelector } from '@/components/DynamicComponent'
import { SermonList } from '@/components/SermonList'
import { FunctionComponent } from 'react'

const SermonsPage: FunctionComponent<{}> =
  () => (
    <>
      <ComponentBySelector
        selector={(c) => c.meta.type === 'hero' && c.meta.name === 'Sermons'}
      />
      <SermonList />
    </>
  )

export default SermonsPage
