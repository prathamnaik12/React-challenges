import { useState } from 'react'
import { useAddPostMutation } from '../api/apiSlice'

export default function AddPostForm() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const [addPost, { isLoading, isSuccess, isError }] = useAddPostMutation()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await addPost({
      userId: 1,
      title,
      body,
    }).unwrap()

    setTitle('')
    setBody('')
  }

  return (
    <form data-testid="add-post-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title"
      />

      <textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Body"
      />

      <button
        type="submit"
        data-testid="add-post-submit"
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Add Post'}
      </button>

      {isSuccess && <div>Post added successfully</div>}
      {isError && <div>Failed to add post</div>}
    </form>
  )
}