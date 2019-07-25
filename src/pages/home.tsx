import * as React from 'react'
import Hero from '../components/hero'
import HeroCard from '../components/hero-card'
import SermonHeroCard from '../components/sermon-hero-card'
import Page from '../components/page'
import Content from '../components/content'

export default () => (
  <Page>
    <Hero media="home">
      <SermonHeroCard />

      <HeroCard title="Giving"
                subtitle="Your Generosity, Making a Difference"
                link="/giving"
                media="giving" />

      <HeroCard title="Connect"
                subtitle="Connect with Us"
                link="/connect"
                media="connect" />
    </Hero>

    <Content name="Home" />
  </Page>
)