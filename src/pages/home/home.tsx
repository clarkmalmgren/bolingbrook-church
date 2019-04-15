import * as React from 'react'
import { Footer } from '../../components/footer/footer'
import { Header } from '../../components/header/header'
import { VideoSource, firebaseVideo } from '../../components/header/video-source';
import HeroImage from '../../assets/images/messages.png'

type HomeProps = {}
type HomeState = {}

const videoSources: VideoSource[] = [
  firebaseVideo("videos%2Fhomepage.webm", "video/webm"),
  firebaseVideo("videos%2Fhomepage.mp4", "video/mp4"),
]

export class HomePage extends React.PureComponent<HomeProps, HomeState> {

  render() {
    return (
      <div>
        <Header height="100%" videoSources={videoSources} background={HeroImage}>

        </Header>

        <main>
          <section className="join">
            <div className="content">
              <h4>Worship With Us</h4>
              <div className="time">Every Saturday</div>
              <ul>
                <li>10:30 AM &amp; 12:30 PM - Services</li>
                <li>10:00 AM &amp; 1:45 PM - Sabath Café</li>
                <li>10:30 AM &amp; 12:30 PM - Discipletown Kids (ages 0-11)</li>
              </ul>

              <h4>Mid-week Experience</h4>
              <div className="time">Every Wednesday</div>
              <ul>
                <li>6:00 PM - Prayer</li>
                <li>7:00 PM - Bible Study</li>
              </ul>

              <h4>Student Connections (ages 12 - 18)</h4>
              <div className="time">Every Friday</div>
              <ul>
                <li>7:00 PM - 9:00 PM</li>
              </ul>

              <h4>Location</h4>
              <div className="location">301 E Boughton Rd, Bolingbrook, IL 60440</div>
            </div>
          </section>

          <section className="white">
            <div className="content">
              <h3 className="black">CREATING SPACES FOR THE PEOPLE GOD MISSES THE MOST</h3>
              <p>
                The church we see goes far beyond the confines of traditional church walls, but one that utilizes a multitude of spaces to
                facilitate genuine relationships and foster spiritual growth. When we say spaces, we don’t just mean buildings or
                corporate gatherings; but rather intentional Jesus-centered communities that seek to create opportunities for the
                people God misses the most to be drawn to him and live out the rest of their lives for Him.
              </p>

              <p>
                For us, the people God misses the most are those who are far from having their own personal relationship with God. Whether
                that means they gave up on church, or have never really explored God for themselves, we believe that those are the
                people God misses so deeply. So, we seek to create a multiplicity of Jesus-centered-highly-relational spaces all
                over the Chicagoland area, and eventually all over the world that make it possible to reach the ones God misses the
                most!
              </p>

              <p>
                Whether you’ve experienced one of our spaces before or are looking to explore for the first time, we hope you find an embracing
                multicultural environment where you feel free to inquire of God, and explore what Jesus teaches as you walk at your
                own pace nearer to Him. Our goal is to help you belong, so that eventually you can become inspired to believe Jesus’
                plan for your life and begin engaging the world as Jesus sees it.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }
}