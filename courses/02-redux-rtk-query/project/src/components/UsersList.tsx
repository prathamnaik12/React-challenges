import { useGetUsersQuery as useQueryHook } from '../api/apiSlice'

export default function UsersList() {
  const { data, isLoading, isError, error } = useQueryHook()

  if (isLoading) {
    return <div data-testid="users-loading">Loading...</div>
  }

  if (isError) {
    return (
      <div data-testid="users-error">
        {error instanceof Error ? error.message : 'Failed to load users'}
      </div>
    )
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