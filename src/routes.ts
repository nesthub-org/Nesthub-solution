import { matchPath } from 'react-router-dom'
import type { ComponentType } from 'react'

interface PageRoute {
  path: string
  load: () => Promise<{ default: ComponentType }>
}

// Each page is its own chunk, so someone landing from an ad on the homepage
// doesn't download every service page and the animation library to see it.
function page<K extends string>(path: string, importer: () => Promise<Record<K, ComponentType>>, name: K): PageRoute {
  return { path, load: () => importer().then((module) => ({ default: module[name] })) }
}

export const pageRoutes: PageRoute[] = [
  page('/', () => import('./pages/Home'), 'Home'),
  page('/services', () => import('./pages/ServicesPage'), 'ServicesPage'),
  page('/portfolio', () => import('./pages/PortfolioPage'), 'PortfolioPage'),
  page('/product', () => import('./pages/ProductPage'), 'ProductPage'),
  page('/process', () => import('./pages/ProcessPage'), 'ProcessPage'),
  page('/about', () => import('./pages/AboutPage'), 'AboutPage'),
  page('/faq', () => import('./pages/FaqPage'), 'FaqPage'),
  page('/contact', () => import('./pages/ContactPage'), 'ContactPage'),
  page('/privacy', () => import('./pages/PrivacyPage'), 'PrivacyPage'),
  page('/careers', () => import('./pages/Careers'), 'Careers'),
  page('/case-studies', () => import('./pages/CaseStudies'), 'CaseStudies'),
  page('/services/website-development', () => import('./pages/WebsiteDevelopment'), 'WebsiteDevelopment'),
  page('/website-development', () => import('./pages/WebsiteDevelopment'), 'WebsiteDevelopment'),
  page('/services/ai-integration', () => import('./pages/AiIntegration'), 'AiIntegration'),
  page('/services/mobile-app-development', () => import('./pages/MobileAppDevelopment'), 'MobileAppDevelopment'),
  page('/services/seo-digital-marketing', () => import('./pages/SeoDigitalMarketing'), 'SeoDigitalMarketing'),
  page('/services/social-media-marketing', () => import('./pages/SocialMediaMarketing'), 'SocialMediaMarketing'),
  page('/services/ui-ux-design', () => import('./pages/UiUxDesign'), 'UiUxDesign'),
  page('/blog', () => import('./pages/Blog'), 'Blog'),
  page('/blog/:slug', () => import('./pages/BlogPost'), 'BlogPost'),
]

export interface InitialPage {
  path: string
  Component: ComponentType
}

/**
 * Loads the page being opened before React starts. A lazy page would suspend on
 * the first render, and the prerendered HTML has no Suspense markers for
 * hydration to match (see src/hooks/usePrerendering.ts), so this one page is
 * rendered directly and only later navigation goes through Suspense.
 */
export async function loadInitialPage(pathname: string): Promise<InitialPage | null> {
  const route = pageRoutes.find((r) => matchPath(r.path, pathname))
  if (!route) return null
  const { default: Component } = await route.load()
  return { path: route.path, Component }
}
