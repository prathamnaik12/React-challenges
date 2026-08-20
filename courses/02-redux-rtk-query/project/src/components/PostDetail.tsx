import { useGetPostByIdQuery } from '../api/apiSlice'

interface PostDetailProps {
  postId?: number
}

export default function PostDetail({ postId }: PostDetailProps) {
  const { data, isLoading, isError, error } = useGetPostByIdQuery(postId!, {
    skip: !postId,
  })

  if (!postId) {
    return <div data-testid="post-detail">No post selected</div>
  }

  if (isLoading) {
    return (
      <div data-testid="post-detail-loading">
        Loading post...
      </div>
    )
  }

  if (isError) {
    return (
      <div data-testid="post-detail-error">
        {error instanceof Error ? error.message : 'Failed to load post'}
      </div>
    )
  }

  if (!data) {
    return <div data-testid="post-detail">Post not found</div>
  }

  return (
    <div data-testid="post-detail">
      <h2>{data.title}</h2>
      <p>{data.body}</p>
    </div>
  )
}