import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes.jsx'
import './index.css'

// vite-react-ssg renders every route to its own HTML file at build time,
// and runs as a normal React app in the browser.
export const createRoot = ViteReactSSG({ routes })
