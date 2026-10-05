const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiOrigin =
  codespaceName && /^[a-zA-Z0-9-]+$/.test(codespaceName)
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000'

export async function fetchCollection(resource, signal) {
  const response = await fetch(`${apiOrigin}/api/${resource}/`, { signal })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()

  if (Array.isArray(payload)) {
    return payload
  }

  const rows =
    payload?.results ??
    payload?.items ??
    (Array.isArray(payload?.data) ? payload.data : payload?.data?.results)

  if (Array.isArray(rows)) {
    return rows
  }

  throw new Error('The API returned an unsupported collection response.')
}
