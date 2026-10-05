import { Link, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-semibold" to="/">
            OctoFit Tracker
          </Link>
          <span className="navbar-text">Your fitness journey, together.</span>
        </div>
      </nav>
      <main className="container py-5">
        <Routes>
          <Route
            path="/"
            element={
              <section className="mx-auto rounded-3 bg-white p-5 shadow-sm">
                <p className="text-uppercase text-primary fw-semibold mb-2">
                  Move together
                </p>
                <h1 className="display-5 fw-bold">Welcome to OctoFit</h1>
                <p className="lead text-secondary mb-0">
                  Track activities, team up with friends, and celebrate every
                  step toward your goals.
                </p>
              </section>
            }
          />
          <Route
            path="*"
            element={
              <section className="text-center">
                <h1>Page not found</h1>
                <Link to="/">Return to OctoFit Tracker</Link>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
