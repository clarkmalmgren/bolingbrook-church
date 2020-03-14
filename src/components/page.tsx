import * as React from 'react'
import Banner from './banner'
import Box from './box'
import Footer from './footer'
import Header from './header'

interface PageProps {
  className?: string
}

const Page: React.FunctionComponent<PageProps> =
  (props) => (
    <div>
      <Header />
      <Banner />
      <Box variant="main" className={props.className}>
        {props.children}
      </Box>
      <Footer />
    </div>
  )

export default Page