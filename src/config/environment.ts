// Picks the backend from the host the site is opened on: the live domain
// talks to the production API, anything local talks to the dev server.

const PROD_API_URL = 'https://api.nestsphere.in'
const LOCAL_API_URL = 'http://localhost:3000'

declare global {
  interface Window {
    /** Set by scripts/prerender.mjs — the build snapshot runs on localhost but must read production data */
    __API_URL__?: string
  }
}

function isLocalHost(hostname: string) {
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '[::1]' ||
    hostname.endsWith('.local') ||
    /^(10|192\.168|172\.(1[6-9]|2\d|3[01]))\./.test(hostname)
  )
}

const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'

export const isProduction = !isLocalHost(hostname)

export const environment = {
  isProduction,
  apiUrl: (typeof window !== 'undefined' && window.__API_URL__) || (isProduction ? PROD_API_URL : LOCAL_API_URL),
}
