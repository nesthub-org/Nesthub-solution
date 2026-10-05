import { useSeo } from './useSeo'

/**
 * Title, description, canonical, Open Graph and Twitter tags for a route.
 * Thin wrapper over useSeo so every page — not just the blog — gets its own
 * social preview instead of inheriting the homepage's og:title/description.
 */
export function useDocumentTitle(title: string, description?: string, path = '/', keywords?: string) {
  useSeo({ title, description, path, keywords })
}
