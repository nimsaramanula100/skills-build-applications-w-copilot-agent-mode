import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Name', render: (user) => user.displayName ?? '-' },
  { label: 'Email', render: (user) => user.email ?? '-' },
]

function Users() {
  return (
    <CollectionPage
      columns={columns}
      emptyMessage="No users have joined yet."
      resource="users"
      title="Users"
    />
  )
}

export default Users
