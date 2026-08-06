interface TaskCardProps {
  title: string
  description: string
  priority: string
  completed?: boolean
  onToggle?: (id: string | number) => void
  taskId?: string | number
}

/**
 * Displays a single task card with its title, description,
 * priority and completion status.
 */

export default function TaskCard(props: TaskCardProps) {
  return (
    <article id="task-card"
      data-completed={props.completed}
    >
      <input
        type="checkbox"
        checked={props.completed}
        onChange={() => props.onToggle?.(props.taskId!)}
      />
      <h2
        style={{
          textDecoration: props.completed
            ? "line-through"
            : "none"
        }}
      >{props.title}</h2>
      <p
        style={{
          textDecoration: props.completed
            ? "line-through"
            : "none"
        }}
      >{props.description}</p>
      <p>Priority: {props.priority}</p>
      <p>
        {props.completed ? "Completed" : "Not Completed"}
      </p>
    </article>
  )
}