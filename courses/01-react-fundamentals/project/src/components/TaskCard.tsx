import { useState } from "react"
import Button from "./Button"
import Badge from "./Badge"
import StatusIndicator from "./StatusIndicator"
interface TaskCardProps {
  id: string | number
  title: string
  description: string
  priority: string
  completed?: boolean
  category: string
  tags: string[]
  dueDate?: string | number
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void
  editingId?: string | number
  onStartEdit?: (id: string | number) => void
  onCancelEdit?: () => void
  onUpdateTask?: (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: string
    }
  ) => void
}



export default function TaskCard(props: TaskCardProps) {

  const [title, setTitle] = useState(props.title)
  const [description, setDescription] = useState(props.description)
  const [priority, setPriority] = useState(props.priority)

  const isEditing =
    props.editingId !== undefined &&
    props.editingId === props.id;

  return (
    <article id="task-card"
      data-completed={props.completed}
    >
      <input
        type="checkbox"
        checked={props.completed}
        onChange={() => props.onToggle?.(props.id!)}
      />
      {isEditing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <h2
          style={{
            textDecoration: props.completed ? "line-through" : "none"
          }}
        >
          {props.title}
        </h2>
      )}
      {isEditing ? (
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      ) : (
        <p
          style={{
            textDecoration: props.completed ? "line-through" : "none"
          }}
        >
          {props.description}
        </p>
      )}

      {isEditing ? (
        <select
          value={priority}

          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      ) : (
        <p>
          Priority: <Badge type="priority">{props.priority}</Badge>
        </p>
      )}

      <p id="task-category">
        Category: <Badge type="category">{props.category}</Badge>
      </p>

      <div id="task-tags">
        {(props.tags ?? []).map((tag) => (
          <Badge key={tag} type="tag">
            {tag}
          </Badge>
        ))}
      </div>

      {props.dueDate && (
        <p id="task-due-date">
          Due: {new Date(props.dueDate).toLocaleDateString()}
        </p>
      )}

      <StatusIndicator
        status={props.completed ? "completed" : "active"}
      />
      {props.onDelete && (
        <Button
          onClick={() => {
            if (window.confirm("Are you sure?")) {
              props.onDelete?.(props.id);
            }
          }}
        >
          Delete
        </Button>
      )}
      {isEditing ? (
        <div>
          <Button
            onClick={() => {
              if (!title.trim()) return;
              props.onUpdateTask?.(props.id, {
                title,
                description,
                priority,
              });
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => props.onCancelEdit?.()}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => props.onStartEdit?.(props.id)}
        >
          Edit
        </Button>
      )}
    </article>
  )
}