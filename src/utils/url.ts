/** Strips protocol and `www.` so a project's live URL reads like a clean domain (e.g. "vedyara.in"). */
export function getDomain(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, '')
  } catch {
    return href
  }
}
