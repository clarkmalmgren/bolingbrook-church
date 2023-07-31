import { FunctionComponent, PropsWithChildren } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { ContentfulPage, PageData } from './contentful/page'
import * as BCRoutes from './pages/index'
import { Preview } from './pages/preview'
import { useEntries } from './services/contentful'
import { Header } from './components/header'
import { Banner } from './components/banner'
import { Footer } from './components/footer'

export const BCSwitch: FunctionComponent<{}> =
  () => {
    const { data: pages } = useEntries<PageData>({ content_type: 'page' })

    if (!pages) {
      return null
    }

    return (
      <Routes>
        <Route path="/preview/:id"           element={<Preview />} />

        <Route path="/" element={<FullScreenView />}>
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
            pages.map(({ path }) => (<Route key={path} path={path} element={<ContentfulPage path={path} />} />))
          }

          <Route                               element={<ContentfulPage />} />
        </Route>
      </Routes>
    )
  }

export const FullScreenView: FunctionComponent<PropsWithChildren<{}>> =
  ({children}) => (
    <>
      <Header />
      <Banner />
      <Outlet />
      <Footer />
    </>
  )
