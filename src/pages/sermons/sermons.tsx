import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Header, Footer, SermonCard } from '../../components'
import { load } from '../../store/sermons/actions'
import { Sermon } from '../../models/sermon'
import { State } from '../../store/sermons/reducer'

interface Props {
  sermons: Sermon[]
  onLoad: () => void
}

class BaseSermons extends React.PureComponent<Props, {}> {

  componentWillMount() {
    this.props.onLoad()
  }

  printSermons() {
    return this.props
      .sermons
      .map(s => (<SermonCard sermon={s} />))
  }

  render() {
    return (
      <div className="bc-about-page">
        <Header shade={1}>
          <h1>Connect</h1>
        </Header>

        <main>
          <section>
            <div className="content">
              { this.printSermons() }
            </div>
          </section>
        </main>

        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state: State): any {
  return {
    sermons: state.sermons
  }
}

function mapDispatchToProps(dispatch: Dispatch): any {
  return {
    onLoad: () => {
      dispatch(load())
    }
  }
}

export const Sermons = connect(mapStateToProps, mapDispatchToProps)(BaseSermons)