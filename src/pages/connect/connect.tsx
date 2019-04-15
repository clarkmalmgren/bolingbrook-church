import * as React from 'react'
import { Footer } from '../../components/footer/footer'
import { Header } from '../../components/header/header'

interface Props {
}

export class Connect extends React.PureComponent<Props, {}> {

  render() {
    return (
      <div className="bc-about-page">
        <Header shade={1}>
          <h1>Connect</h1>
        </Header>

        <main>
          <section>
            <div className="content">
              Eventually fill this out
            </div>
          </section>
        </main>

        <Footer />
      </div>
    )
  }
}
