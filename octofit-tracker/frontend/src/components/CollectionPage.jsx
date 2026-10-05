import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function CollectionPage({ columns, emptyMessage, resource, title }) {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setLoading(true)
      setError('')

      try {
        setRows(await fetchCollection(resource, controller.signal))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadCollection()

    return () => controller.abort()
  }, [resource])

  return (
    <section className="rounded-4 bg-white p-4 p-md-5 shadow-sm">
      <div className="mb-4">
        <p className="text-uppercase text-primary fw-semibold mb-2">
          OctoFit Tracker
        </p>
        <h1 className="h2 fw-bold mb-0">{title}</h1>
      </div>

      {loading && (
        <p aria-live="polite" className="text-secondary mb-0">
          Loading {title.toLowerCase()}...
        </p>
      )}
      {error && (
        <div className="alert alert-danger mb-0" role="alert">
          Unable to load {title.toLowerCase()}: {error}
        </div>
      )}
      {!loading && !error && rows.length === 0 && (
        <p className="text-secondary mb-0">{emptyMessage}</p>
      )}
      {!loading && !error && rows.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                {columns.map(({ label }) => (
                  <th key={label} scope="col">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row._id ?? row.id ?? `${resource}-${index}`}>
                  {columns.map(({ render, label }) => (
                    <td key={label}>{render(row)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default CollectionPage
