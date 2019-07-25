import * as React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import Hero from '../components/hero'
import HeroCard from '../components/hero-card'
import Page from '../components/page'
import Content from '../components/content'

interface GivingState {
  addressShown: boolean
}

export default class Giving extends React.PureComponent<{}, GivingState> {

  state = { addressShown: false } as GivingState

  open = () => this.setState({ addressShown: true })
  close = () => this.setState({ addressShown: false })
  
  render() {
    return (
      <Page>
        <Hero media="giving" height={0.7}>
          
          <HeroCard title="Envelope"
                    subtitle="Cash or Check"
                    onClick={this.open}
                    media="envelope" />
          
          <HeroCard title="Online"
                    subtitle="Adventist Giving"
                    link="https://www.adventistgiving.org/?OrgID=ANF4BV"
                    media="online" />

          <HeroCard title="Text Amount To"
                    subtitle="630-246-4885"
                    link="tel:6302464885"
                    media="text" />
        </Hero>

        <Content name="Giving" />

        <Dialog open={this.state.addressShown} onClose={this.close}>
          <DialogTitle>Mail</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can always mail a check to our church offices:<br/><br/>
              Bolingbrook Church<br/>
              301 E Boughton Rd<br/>
              Bolingbrook, IL 60440
            </DialogContentText>
            <DialogActions>
              <Button onClick={this.close}>OK</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Page>
    )
  }
}
