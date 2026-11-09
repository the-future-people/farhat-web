import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import Solutions from './pages/Solutions.jsx'
import OurWork from './pages/OurWork.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'solutions', element: <Solutions /> },
      { path: 'our-work', element: <OurWork /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      // built to dist/404/index.html, then copied to dist/404.html for Vercel (see postbuild)
      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
