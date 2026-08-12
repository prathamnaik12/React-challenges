import { useNavigate, useParams } from "react-router-dom"
import type { Task } from "./TaskList"

const STORAGE_KEY = "task-app-tasks"

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  let tasks: Task[] = []

  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY)

    if (savedTasks) {
      tasks = JSON.parse(savedTasks) as Task[]
    }
  } catch {
    tasks = []
  }

  const task = tasks.find(
    (item) => String(item.id) === id
  )

  if (!task) {
    return (
      <div id="task-detail-page">
        <h2>Task not found</h2>

        <button
          id="task-detail-back"
          onClick={() =>
            navigate("/challenge/21-react-router")
          }
        >
          Back to list
        </button>
      </div>
    )
  }

  return (
    <div id="task-detail-page">
      <h1>{task.title}</h1>

      <p>{task.description}</p>

      <p>
        Priority: {task.priority}
      </p>

      <p>
        Category: {task.category}
      </p>

      <p>
        Status:{" "}
        {task.completed ? "Completed" : "Active"}
      </p>

      {task.tags.length > 0 && (
        <p>
          Tags: {task.tags.join(", ")}
        </p>
      )}

      {task.dueDate && (
        <p>
          Due:{" "}
          {new Date(
            task.dueDate
          ).toLocaleDateString()}
        </p>
      )}

      <button
        id="task-detail-back"
        onClick={() =>
          navigate("/challenge/21-react-router")
        }
      >
        Back to list
      </button>
    </div>
  )
}