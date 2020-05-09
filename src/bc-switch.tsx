import React, { FunctionComponent, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router'
import { ContentfulPage, PageData } from './contentful/page'
import * as Routes from './pages/index'
import { client } from './services/contentful'

export const BCSwitch: FunctionComponent<{}> =
  () => {
    const [pages, setPages] = useState([] as string[])

    useEffect(() => {
      if (!pages.length) {
        client
          .getEntries<PageData>({ content_type: 'page' })
          .then(collection => {
            setPages(collection.items.map(e => e.fields.path))
          })
      }
    })

    if (pages.length === 0) {
      return null
    }

    return (
      <Switch>
        <Route exact path="/"                     component={() => <ContentfulPage path='/' />} />
        <Route exact path="/about"                component={() => <ContentfulPage path='/about' />} />
        <Route exact path="/location"             component={Routes.Location} />
        <Route exact path="/connect"              component={Routes.Connect} />
        <Route exact path="/friends-and-family"   component={() => <ContentfulPage path='/friends-and-family' />}  />
        <Route exact path="/giving"               component={() => <ContentfulPage path='/giving' />}  />
        <Route exact path="/shop-bc"              component={Routes.ShopBC} />
        <Route exact path="/meet-us"              component={() => <ContentfulPage path='/meet-us' />}  />
        <Route exact path="/newsletter"           component={Routes.Newsletter} />
        <Route exact path="/sermons/:id"          component={Routes.Sermon} />
        <Route exact path="/sermons"              component={Routes.Sermons} />
        <Route exact path="/serve"                component={Routes.Serve} />
        <Route exact path="/thank-you"            component={() => <ContentfulPage path='/thank-you' />}  />

        <Route exact path="/admin"                component={Routes.AdminPage} />
        <Route exact path="/admin/login"          component={Routes.Login} />
        <Route exact path="/admin/sermons"        component={Routes.EditSermons} />
        <Route exact path="/admin/sermons/new"    component={Routes.NewSermon} />
        <Route exact path="/admin/sermons/:id"    component={Routes.EditSermon} />

        {
          pages.map(path => (<Route key={path} exact path={path} component={() => <ContentfulPage path={path} />} />))
        }

        <Route                                    component={ContentfulPage} />
    </Switch>
    )


  }
