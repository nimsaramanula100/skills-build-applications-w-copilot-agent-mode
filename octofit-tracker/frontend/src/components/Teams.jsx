import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Team', render: (team) => team.name ?? '-' },
  { label: 'Description', render: (team) => team.description || '-' },
  {
    label: 'Members',
    render: (team) =>
      Array.isArray(team.members) ? team.members.length : '-',
  },
]

function Teams() {
  return (
    <CollectionPage
      columns={columns}
      emptyMessage="No teams have been created yet."
      resource="teams"
      title="Teams"
    />
  )
}

export default Teams
