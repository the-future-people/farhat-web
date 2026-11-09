import { Head } from 'vite-react-ssg'

// Set VITE_SITE_URL in Vercel to the preview address until the domain moves; defaults to the real domain.
const SITE = (import.meta.env.VITE_SITE_URL || 'https://farhatprintingpress.com').replace(/\/$/, '')
const NAME = 'Farhat Printing Press'

// One place for each page's title, description and link-preview tags.
export default function Seo({ title, description, path = '/', noindex = false }) {
  const fullTitle = title ? `${title} · ${NAME}` : NAME
  const url = SITE + path
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE}/og.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}
