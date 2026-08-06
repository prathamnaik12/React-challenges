import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import { useState } from 'react'
import FilterBar from './FilterBar'


interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  dispatch?: (action: { type: string; payload?: unknown }) => void
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
}

export default function TaskApp(_props: TaskAppProps) {
  const handleAddTask = (task: Record<string, unknown>) => {
    _props.setTasks?.((prev) => [...prev, task as unknown as Task]);
  };
  const handleToggle = (id: string | number) => {
    _props.setTasks?.((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const [filter, setFilter] = useState<
    "all" | "active" | "completed"
  >("all");

  const [sortOrder, setSortorder] = useState("recent")

  const filteredTasks =
    filter === "all"
      ? _props.tasks
      : filter === "active"
        ? _props.tasks?.filter((task) => !task.completed)
        : _props.tasks?.filter((task) => task.completed);

  const priorityValue = {
    High: 3,
    Medium: 2,
    Low: 1
  };

  const sortedTasks = [...(filteredTasks ?? [])];

  switch (sortOrder) {
    case "high":
      sortedTasks.sort(
        (a, b) =>
          priorityValue[
          b.priority as keyof typeof priorityValue] - priorityValue[a.priority as keyof typeof priorityValue]
      );
      break;

    case "low":
      sortedTasks.sort(
        (a, b) =>
          priorityValue[
          a.priority as keyof typeof priorityValue] - priorityValue[b.priority as keyof typeof priorityValue]
      );
      break;

    case "alpha":
      sortedTasks.sort((a, b) =>
        a.title.localeCompare(
          b.title,
          undefined,
          { sensitivity: "base" }
        )
      );
      break;

    case "recent":
    default:
      break;
  }

  return (
    <div>
      <TaskForm onAddTask={handleAddTask} />
      {_props.showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          sortOrder={sortOrder}
          setSortorder={setSortorder}
        />
      )}
      {filteredTasks?.length === 0 && (
        <p id="filter-empty-message">
          No tasks match this filter
        </p>
      )}
      <TaskList
        tasks={sortedTasks}
        countText={`Showing ${filteredTasks?.length ?? 0} of ${_props.tasks?.length ?? 0} tasks`}
        onToggle={handleToggle}
        onDelete={_props.onDelete}
      />
    </div>
  );
}