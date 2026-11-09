// Vercel serves dist/404.html for unknown addresses; vite-react-ssg builds it to dist/404/index.html.
import { copyFileSync } from 'node:fs'
copyFileSync('dist/404/index.html', 'dist/404.html')
console.log('404.html ready')
