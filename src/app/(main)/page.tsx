import { FunctionComponent } from 'react'
import DynamicPage from './[...path]/page'

const Home: FunctionComponent<{}> =
  () => <DynamicPage params={{ path: [] }} />

export default Home
