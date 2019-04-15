import React, { PureComponent } from 'react'
import { Header } from '../../components/header/header'
import { Footer } from '../../components/footer/footer'

const href =
  "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJsWqLHlBaDogRzwidXU9DMnk&key=AIzaSyCKaQgqd0cxJQ932U57W74Bpe8CALxZEUw"


export class Locations extends PureComponent<{}, {}> {

  render() {
    return (
      <div className="bc-location-page">
        <Header shade={1} />
        <main>
          <section className="white">
            <div className="content">
              <h1>Location</h1>
              
              <p className="address">
                We are located at:
                301 E Boughton Rd,
                Bolingbrook, IL 60440
              </p>
            
              <div className="wrapper">
                <iframe frameBorder="0" allowFullScreen src={href}></iframe>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }
}