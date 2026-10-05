import { Link, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
]

function Home() {
  return (
    <section className="rounded-4 bg-white p-4 p-md-5 shadow-sm">
      <p className="text-uppercase text-primary fw-semibold mb-2">
        Move together
      </p>
      <h1 className="display-5 fw-bold">Welcome to OctoFit</h1>
      <p className="lead text-secondary">
        Track activities, team up with friends, and celebrate every step toward
        your goals.
      </p>
      <div className="row g-3 mt-3">
        {navigation.map(({ to, label }) => (
          <div className="col-12 col-sm-6 col-lg-4" key={to}>
            <Link
              className="d-block rounded-3 border p-3 fw-semibold text-decoration-none"
              to={to}
            >
              Explore {label}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

function NotFound() {
  return (
    <section className="text-center rounded-4 bg-white p-5 shadow-sm">
      <h1>Page not found</h1>
      <Link to="/">Return to OctoFit Tracker</Link>
    </section>
  )
}

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-semibold" to="/">
            OctoFit Tracker
          </Link>
          <div className="navbar-nav flex-row flex-wrap gap-1">
            {navigation.map(({ to, label }) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-2 ${isActive ? 'active fw-semibold' : ''}`
                }
                key={to}
                to={to}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      <main className="container py-4 py-md-5">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Users />} path="/users" />
          <Route element={<Workouts />} path="/workouts" />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </main>
    </div>
  )
}

export default App
