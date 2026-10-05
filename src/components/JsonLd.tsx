import { embedJson } from '../lib/blog'

/** Renders a JSON-LD block in place; the prerender snapshot keeps it in the static HTML. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={embedJson(data)} />
}
