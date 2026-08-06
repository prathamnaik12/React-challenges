import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
import TaskList from './TaskList'
import TaskForm from './TaskForm'


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

  const completedCount =
    _props.tasks?.filter((task) => task.completed).length ?? 0;

  const totalCount =
    _props.tasks?.length ?? 0;

  return (
    <div>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={_props.tasks}
        countText={`${completedCount} of ${totalCount} completed`}
        onToggle={handleToggle}
      />
    </div>
  );
}