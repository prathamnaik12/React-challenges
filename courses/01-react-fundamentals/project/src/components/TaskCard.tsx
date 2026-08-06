interface TaskCardProps {
  id: string | number
  title: string
  description: string
  priority: string
  completed?: boolean
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void
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
        onChange={() => props.onToggle?.(props.id!)}
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
      {props.onDelete && (
        <button
          onClick={() => {
            if (window.confirm("Are you sure?")) {
              props.onDelete?.(props.id);
            }
          }}
        >
          Delete
        </button>
      )}
    </article>
  )
}