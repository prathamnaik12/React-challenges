import { useMemo } from 'react'
import { useGetPostsQuery } from '../api/apiSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setFilterUserId, setSortBy } from '../store/slices/filtersSlice'

export default function PostsWithFilters() {
  const dispatch = useAppDispatch()

  const { sortBy, filterUserId } = useAppSelector(
    (state) => state.filters
  )

  const { data, isLoading, isError } = useGetPostsQuery()

  const posts = useMemo(() => {
    if (!data) return []

    const filteredPosts = filterUserId
      ? data.filter((post) => post.userId === filterUserId)
      : [...data]

    filteredPosts.sort((a, b) =>
      sortBy === 'newest' ? b.id - a.id : a.id - b.id
    )

    return filteredPosts
  }, [data, filterUserId, sortBy])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Failed to load posts</div>
  }

  return (
    <div data-testid="posts-with-filters">
      <div data-testid="filter-controls">
        <button onClick={() => dispatch(setFilterUserId(null))}>
          All
        </button>

        <button onClick={() => dispatch(setFilterUserId(1))}>
          User 1
        </button>

        <button onClick={() => dispatch(setFilterUserId(2))}>
          User 2
        </button>

        <button onClick={() => dispatch(setSortBy('newest'))}>
          Newest
        </button>

        <button onClick={() => dispatch(setSortBy('oldest'))}>
          Oldest
        </button>
      </div>

      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <span>User {post.userId}</span>
          </div>
        ))}
      </div>
    </div>
  )
}