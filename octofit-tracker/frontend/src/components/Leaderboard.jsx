import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Rank', render: (entry) => entry.rank ?? '-' },
  { label: 'Athlete', render: (entry) => entry.user?.displayName ?? '-' },
  {
    label: 'Points',
    render: (entry) =>
      entry.points == null ? '-' : entry.points.toLocaleString(),
  },
]

function Leaderboard() {
  return (
    <CollectionPage
      columns={columns}
      emptyMessage="The leaderboard is waiting for its first entries."
      resource="leaderboard"
      title="Leaderboard"
    />
  )
}

export default Leaderboard
