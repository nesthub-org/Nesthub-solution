import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const rootEl = document.getElementById('root')!

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Production builds are prerendered (see scripts/prerender.mjs), so `root`
// already contains real markup — hydrate over it instead of wiping and
// re-rendering from scratch. In dev, `root` starts empty, so fall back to a
// normal client render.
//
// The prerender stamps each snapshot with the route it was captured from.
// Routes that weren't prerendered (admin, a post published since the last
// build) are served the homepage snapshot as a fallback, so hydrating would
// mismatch — discard it and render fresh instead.
const snapshotRoute = rootEl.dataset.route
const currentRoute = window.location.pathname.replace(/\/+$/, '') || '/'
// /blog?tag=… and /blog?page=… share the /blog snapshot but render different posts
const variesByQuery = currentRoute === '/blog' && /[?&](tag|page)=/.test(window.location.search)
const snapshotMatches = !snapshotRoute || (snapshotRoute === currentRoute && !variesByQuery)

if (rootEl.hasChildNodes() && snapshotMatches) {
  hydrateRoot(rootEl, app)
} else {
  rootEl.replaceChildren()
  delete rootEl.dataset.route
  createRoot(rootEl).render(app)
}
