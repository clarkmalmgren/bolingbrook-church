import { FunctionComponent, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ContentfulPage, PageData } from './contentful/page'
import * as BCRoutes from './pages/index'
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
      <Routes>
        <Route path="/"                      element={<ContentfulPage path='/' />} />
        <Route path="/about"                 element={<ContentfulPage path='/about' />} />
        <Route path="/location"              element={<BCRoutes.Location />} />
        <Route path="/connect"               element={<BCRoutes.Connect />} />
        <Route path="/friends-and-family"    element={<ContentfulPage path='/friends-and-family' />}  />
        <Route path="/giving"                element={<ContentfulPage path='/giving' />}  />
        <Route path="/shop-bc"               element={<BCRoutes.ShopBC />} />
        <Route path="/meet-us"               element={<ContentfulPage path='/meet-us' />}  />
        <Route path="/newsletter"            element={<BCRoutes.Newsletter />} />
        <Route path="/sermons/:id"           element={<BCRoutes.Sermon />} />
        <Route path="/sermons"               element={<BCRoutes.Sermons />} />
        <Route path="/join-a-team"           element={<BCRoutes.Serve />} />
        <Route path="/thank-you"             element={<ContentfulPage path='/thank-you' />}  />

        <Route path="/admin"                 element={<BCRoutes.AdminPage />} />
        <Route path="/admin/login"           element={<BCRoutes.Login />} />
        <Route path="/admin/sermons"         element={<BCRoutes.EditSermons />} />
        <Route path="/admin/sermons/new"     element={<BCRoutes.NewSermon />} />
        <Route path="/admin/sermons/:id"     element={<BCRoutes.EditSermonFromPath />} />

        {
          pages.map(path => (<Route key={path} path={path}  element={<ContentfulPage path={path} />} />))
        }

        <Route                                     element={<ContentfulPage />} />
    </Routes>
    )


  }
