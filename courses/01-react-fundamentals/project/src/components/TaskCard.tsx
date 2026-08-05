interface TaskCardProps {
  title: string
  description: string
  priority: string
  completed?: boolean
  onToggle?: (id: string | number) => void
  // taskId?: string | number
}

/**
 * Displays a single task card with its title, description,
 * priority and completion status.
 */

export default function TaskCard(props: TaskCardProps) {
  return (
    <article id="task-card">
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <p>Priority: {props.priority}</p>
      <p>
        {props.completed ? "Completed" : "Not Completed"}
      </p>
    </article>
  )
}