import * as React from 'react'
import { Link } from 'react-router-dom'
import Icon from '@material-ui/core/Icon';
import { Button } from '../button/button';

const { version: appVersion } = require('../../../package.json')

export class Footer extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div className="footer">
        <div className="notice">
          Our live streams begins at 10:30am &amp; 12:30pm Central Time on Saturdays.
        </div>
        <div className="content">

          <section className="social">
            <a href="http://www.twitter.com/bolingbrooksda"><span className="socicon-twitter"></span></a>
            <a href="http://instagram.com/bolingbrookchurch"><span className="socicon-instagram"></span></a>
            <a href="https://www.facebook.com/bolingbrooksda"><span className="socicon-facebook"></span></a>
            <a href="https://www.youtube.com/channel/UCLkqCaFc_-puBhVEGLxCnbw"><span className="socicon-youtube"></span></a>
          </section>

          <section className="links">
            <h4>About</h4>

            <ul>
              <li><Button variant="text" fullWidth={true} align="left" link="/about">Our Story</Button></li>
              <li><Button variant="text" fullWidth={true} align="left" link="/locations">Locations</Button></li>
              <li><Button variant="text" fullWidth={true} align="left" link="/sermons">Sermons</Button></li>
              <li><Button variant="text" fullWidth={true} align="left" link="/connect">Get Connected</Button></li>
            </ul>
          </section>

          <section className="links">
            <h4>Get Involved</h4>

            <ul>
              <li><Button variant="text" fullWidth={true} align="left" link="/giving">Giving</Button></li>
              <li><Button variant="text" fullWidth={true} align="left" link="/serve">Serve</Button></li>
              <li><Button variant="text" fullWidth={true} align="left" link="/newsletter">Newsletter</Button></li>
            </ul>
          </section>
        </div>

        <div className="contact">
          <p><Icon>pin_drop</Icon> 301 E Boughton Rd, Bolingbrook IL, 60440</p>
          <p><a href="tel:630.739.1038"><Icon>local_phone</Icon> 630.739.1038</a></p>
          <p className="copyright">&copy; Bolingbrook Church 2017</p>
        </div>

        <div className="version">
          v{appVersion}
        </div>
      </div>
    )
  }
}