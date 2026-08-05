import { useState } from "react"
interface TaskFormProps {
  onAddTask?: (task: Record<string, unknown>) => void
}

export default function TaskForm(_props: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [error, setError] = useState("");
  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    setError("");
    _props.onAddTask?.({
      id: Date.now(),
      title,
      description,
      priority,
      completed: false,
    });

    setTitle("");
    setDescription("");
    setPriority("Low");
  }
  return (
    <form onSubmit={handlesubmit}>
      <div>
        <label htmlFor="task-title">Title:</label>
        <input
          id="task-title"
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="task-description">Description:</label>
        <textarea
          id="task-description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="task-priority">Priority:</label>
        <select
          id="task-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <p id="task-form-error">{error}</p>
      <div>
        <button type="submit">Add Task</button>
      </div>
    </form>

  )
}