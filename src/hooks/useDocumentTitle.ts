import { useEffect } from 'react'

export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    let prevDescription: string | null = null
    const meta = description ? document.querySelector('meta[name="description"]') : null
    if (meta && description) {
     
      prevDescription = meta.getAttribute('content')
      meta.setAttribute('content', description)
    }

    return () => {
      document.title = prevTitle
      if (meta && prevDescription !== null) meta.setAttribute('content', prevDescription)
    }
  }, [title, description])
}
