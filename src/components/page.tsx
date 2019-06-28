import * as React from 'react'
import Box from './box'
import Footer from './footer'
import Header from './header'

export default class Page extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div>
        <Header />
        <Box variant="main">
          {this.props.children}
        </Box>
        <Footer />
      </div>
    )
  }
}