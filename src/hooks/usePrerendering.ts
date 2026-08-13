import { useEffect, useState } from 'react'

// scripts/prerender.mjs marks the page via `window.__PRERENDER__` before any
// app code runs. Components that lazy-load behind a <Suspense> boundary must
// check this and skip rendering during that pass.
declare global {
  interface Window {
    __PRERENDER__?: boolean
  }
}

export function isPrerendering(): boolean {
  return typeof window !== 'undefined' && window.__PRERENDER__ === true
}

// Our "prerendering" isn't true streaming SSR — it's a headless browser
// capturing a settled client-render as static HTML, with none of the
// <!--$--> hydration-boundary markers React's real SSR embeds for Suspense.
// hydrateRoot() can't reconcile a <Suspense> boundary through that snapshot
// at all, even when the fallback content matches on both sides — it throws
// and discards the prerendered DOM for that subtree regardless.
//
// The fix is to keep the lazy component out of the tree hydrateRoot() ever
// sees: start unmounted, and only mount it from a useEffect (which runs
// after hydration has already committed). That turns it into an ordinary
// post-hydration client render, where Suspense works exactly as normal.
// During the prerender capture, isPrerendering() keeps it permanently
// unmounted so the snapshot has nothing there to hydrate in the first place.
export function useMountAfterHydration(): boolean {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    if (isPrerendering()) return
    setMounted(true)
  }, [])
  return mounted
}
