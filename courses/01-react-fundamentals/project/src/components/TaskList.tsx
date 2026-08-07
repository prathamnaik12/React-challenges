import TaskCard from "./TaskCard"
export interface Task {
  id: string | number
  title: string
  description: string
  priority: string
  completed: boolean
  category?: string
  tags?: string[]
  dueDate?: string | number

}

interface TaskListProps {
  tasks?: Task[]
  countText?: string
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
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
const tasks: Task[] = [
  {
    id: 1,
    title: "Task One",
    description: "these is the first task",
    priority: "medium",
    completed: false
  },
  {
    id: 2,
    title: "Task Two",
    description: "these is the second task",
    priority: "High",
    completed: false
  },
  {
    id: 3,
    title: "Task Three",
    description: "these is the Third task",
    priority: "Low",
    completed: true
  }
];

/**
 * Renders the list of tasks.
 */

export default function TaskList(_props: TaskListProps) {
  const tasklist = Array.isArray(_props.tasks)
    ? _props.tasks
    : tasks;

  return (
    <div>
      {typeof _props.countText === "string" && (
        <p id="task-count">
          {_props.countText}
        </p>
      )}
      <section id="task-list" >
        {tasklist.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            completed={task.completed}
            onToggle={_props.onToggle}
            onDelete={_props.onDelete}
            editingId={_props.editingId}
            onStartEdit={_props.onStartEdit}
            onCancelEdit={_props.onCancelEdit}
            onUpdateTask={_props.onUpdateTask}
          />
        ))}
      </section>
    </div>
  );
}
export { default as FilterBar } from "./FilterBar";