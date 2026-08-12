import { useEffect, useState } from "react"

interface Item {
  id: number
  title: string
}

export default function FetchDemoView() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchItems = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch("/api/todos.json")

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`)
        }

        const data: Item[] = await response.json()

        if (!cancelled) {
          setItems(data)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong"
          )
          setLoading(false)
        }
      }
    }

    fetchItems()

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return <div id="fetch-loading">Loading...</div>
  }

  if (error) {
    return <div id="fetch-error">{error}</div>
  }

  return (
    <ul id="fetch-list">
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}