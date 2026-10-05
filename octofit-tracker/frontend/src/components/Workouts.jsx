import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Workout', render: (workout) => workout.title ?? '-' },
  { label: 'Type', render: (workout) => workout.activityType ?? '-' },
  { label: 'Level', render: (workout) => workout.level ?? '-' },
  {
    label: 'Duration',
    render: (workout) =>
      workout.durationMinutes == null
        ? '-'
        : `${workout.durationMinutes} min`,
  },
  { label: 'Description', render: (workout) => workout.description ?? '-' },
]

function Workouts() {
  return (
    <CollectionPage
      columns={columns}
      emptyMessage="No workouts are available yet."
      resource="workouts"
      title="Workouts"
    />
  )
}

export default Workouts
