import { useState } from "react"
import Button from "./Button"
import FormInput from "./FormInput"
interface TaskFormProps {
  onAddTask?: (task: Record<string, unknown>) => void
}

export default function TaskForm(_props: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState("");
  const [dueDate, setDueDate] = useState("")
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
      category,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      dueDate: dueDate || undefined,
    });

    setTitle("");
    setDescription("");
    setPriority("Low");
    setCategory("General")
    setTags("")
    setDueDate("")
  }
  return (
    <form onSubmit={handlesubmit}>
      <div>
        <label htmlFor="task-title">Title:</label>
        <FormInput
          id="task-title"
          label="Title:"
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={error}
        />
      </div>
      <div>
        <label htmlFor="task-description">Description:</label>
        <FormInput
          id="task-description"
          label="Description:"
          type="textarea"
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
      <div>
        <label htmlFor="task-category">Category:</label>
        <select
          id="task-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <div>
        <label htmlFor="task-tags">Tags:</label>
        <input
          id="task-tags"
          type="text"
          placeholder="react, frontend, college"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="task-due-date">Due Date:</label>
        <input
          id="task-due-date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <p id="task-form-error">{error}</p>
      <div>
        <Button type="submit">
          Add Task
        </Button>
      </div>
    </form>

  )
}