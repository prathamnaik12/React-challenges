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

  // const completedCount =
  //   _props.tasks?.filter((task) => task.completed).length ?? 0;

  // const totalCount =
  //   _props.tasks?.length ?? 0;

  const [filter, setFilter] = useState<
    "all" | "active" | "completed"
  >("all");
  const filteredTasks =
    filter === "all"
      ? _props.tasks
      : filter === "active"
        ? _props.tasks?.filter((task) => !task.completed)
        : _props.tasks?.filter((task) => task.completed);
  return (
    <div>
      <TaskForm onAddTask={handleAddTask} />
      {_props.showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
        />
      )}
      {filteredTasks?.length === 0 && (
        <p id="filter-empty-message">
          No tasks match this filter
        </p>
      )}
      <TaskList
        tasks={filteredTasks}
        countText={`Showing ${filteredTasks?.length ?? 0} of ${_props.tasks?.length ?? 0} tasks`}
        onToggle={handleToggle}
        onDelete={_props.onDelete}
      />
    </div>
  );
}