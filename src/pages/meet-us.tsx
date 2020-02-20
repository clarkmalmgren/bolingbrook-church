import * as React from 'react'
import { Typography } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import Page from '../components/page'
import { list, StaffInfo } from '../services/staff'
import Box from '../components/box'
import Hero from '../components/hero'
import StaffCard from '../components/staff-card'

const styles = createStyles({
  header: {
    color: 'white'
  },
  
  list: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
  }
})

interface MeetUsState {
  staff: StaffInfo[] 
}

class MeetUs extends React.PureComponent<WithStyles<typeof styles>, MeetUsState> {
  state = { staff: [] as StaffInfo[] }

  componentDidMount() {
    list().then(staff => {
      this.setState({ staff })
    })
  }

  render() {

    return (
      <Page>
        <Hero media="meetUs" height={0.3} shade={0.4}>
          <Typography className={this.props.classes.header} variant="h1">Meet Us</Typography>
        </Hero>
        <Box className={this.props.classes.list}>
          { this.state.staff.map(info => { return (<StaffCard key={info.name} info={info} />) }) }
        </Box>
      </Page>
    )
  }
}

export default withStyles(styles)(MeetUs)