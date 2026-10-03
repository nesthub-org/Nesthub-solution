// Base URL of the Express backend (no trailing slash), e.g. https://api.nesthubsolution.in
export const API_URL = ((import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:8000').replace(/\/$/, '')

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

interface ApiEnvelope<T> {
  success: boolean
  message: string
  data: T
}

/** Calls the backend with the auth cookie and unwraps its `{ success, message, data }` envelope. */
export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const isForm = init.body instanceof FormData
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      ...(init.body && !isForm ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  })

  let body: ApiEnvelope<T> | null = null
  try {
    body = await res.json()
  } catch {
    // non-JSON response (e.g. proxy error page)
  }

  if (!res.ok || !body?.success) {
    throw new ApiError(body?.message || `Request failed (${res.status})`, res.status)
  }
  return body.data
}
