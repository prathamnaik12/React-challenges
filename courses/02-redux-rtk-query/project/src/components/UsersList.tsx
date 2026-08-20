import { useGetUsersQuery as useQueryHook } from '../api/apiSlice'
import ErrorDisplay from './ErrorDisplay'

export default function UsersList() {
  const { data, isLoading, isError, error, refetch } = useQueryHook(undefined)

  if (isLoading) {
    return <div data-testid="users-loading">Loading users...</div>
  }

  if (isError) {
    return <ErrorDisplay error={error} onRetry={refetch} />
  }

  return (
    <div data-testid="users-list">
      {data?.map((user) => (
        <div key={user.id}>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{user.username}</div>
        </div>
      ))}
    </div>
  )
}