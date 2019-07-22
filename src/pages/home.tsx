import * as React from 'react'
import Hero, { VideoSource } from '../components/hero'
import HeroCard from '../components/hero-card'
import SermonHeroCard from '../components/sermon-hero-card'
import Page from '../components/page'
import Content from '../components/content'

const firebaseRootUrl = "https://firebasestorage.googleapis.com/v0/b/bolingbrook-church.appspot.com/o/"
function firebaseVideo(id: string, type: string): VideoSource {
  return { url: firebaseRootUrl + id + "?alt=media", type: type }
}

const video: VideoSource[] = [
  firebaseVideo("videos%2Fhomepage.webm", "video/webm"),
  firebaseVideo("videos%2Fhomepage.mp4", "video/mp4")
]

export default () => (
  <Page>
    <Hero video={video}>
      <SermonHeroCard />

      <HeroCard title="Giving"
                subtitle="Your Generosity, Making a Difference"
                link="/giving"
                image="https://guardian.ng/wp-content/uploads/2017/12/tithe.jpg" />

      <HeroCard title="Connect"
                subtitle="Connect with Us"
                link="/connect"
                cdnImage="1lxA3lauXk9zUMvM0InUCg" />
    </Hero>

    <Content name="Home" />
  </Page>
)