import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Athlete', render: (activity) => activity.user?.displayName ?? '-' },
  { label: 'Activity', render: (activity) => activity.type ?? '-' },
  {
    label: 'Duration',
    render: (activity) =>
      activity.durationMinutes == null
        ? '-'
        : `${activity.durationMinutes} min`,
  },
  {
    label: 'Distance',
    render: (activity) =>
      activity.distanceKm == null ? '-' : `${activity.distanceKm} km`,
  },
  {
    label: 'Steps',
    render: (activity) =>
      activity.steps == null ? '-' : activity.steps.toLocaleString(),
  },
  {
    label: 'Date',
    render: (activity) =>
      activity.date ? new Date(activity.date).toLocaleDateString() : '-',
  },
]

function Activities() {
  return (
    <CollectionPage
      columns={columns}
      emptyMessage="No activities have been recorded yet."
      resource="activities"
      title="Activities"
    />
  )
}

export default Activities
