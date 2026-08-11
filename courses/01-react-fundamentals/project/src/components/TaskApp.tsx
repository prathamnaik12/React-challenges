import type { Task } from './TaskList'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import {
  useState,
  useEffect,
  useMemo,
  type Dispatch,
} from 'react'
import FilterBar from './FilterBar'
import StatsPanel from './StatsPanel'
import { useTheme } from '../contexts/ThemeContext'

import {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  type TaskAction,
} from '../reducers/taskReducre'

interface TaskAppProps {
  tasks?: Task[]
  dispatch?: Dispatch<TaskAction>
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  linkToTaskDetail?: boolean
}

export default function TaskApp(_props: TaskAppProps) {
  const { theme, toggleTheme } = useTheme()

  const handleAddTask = (
    task: Record<string, unknown>
  ) => {
    _props.dispatch?.({
      type: ADD_TASK,
      payload: task as unknown as Task,
    })
  }

  const handleToggle = (
    id: string | number
  ) => {
    _props.dispatch?.({
      type: TOGGLE_TASK,
      payload: id,
    })
  }

  const handleDelete = (id: string | number) => {
    if (window.confirm('Are you sure?')) {
      _props.dispatch?.({
        type: DELETE_TASK,
        payload: id,
      })
    }
  }

  const [filter, setFilter] = useState<
    'all' | 'active' | 'completed'
  >('all')

  const [sortOrder, setSortorder] =
    useState('recent')

  const [search, setSearch] =
    useState('')

  const [debouncedSearch, setDebouncedSearch] =
    useState('')

  const [category, setCategory] =
    useState('all')

  const categories = [
    ...new Set(
      (_props.tasks ?? [])
        .map((task) => task.category)
        .filter(Boolean)
    ),
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => clearTimeout(timer)
  }, [search])

  const filteredTasks =
    filter === 'all'
      ? _props.tasks
      : filter === 'active'
        ? _props.tasks?.filter(
          (task) => !task.completed
        )
        : _props.tasks?.filter(
          (task) => task.completed
        )

  const categoryFilteredTasks =
    category === 'all'
      ? filteredTasks
      : filteredTasks?.filter(
        (task) => task.category === category
      )

  const searchedTasks =
    categoryFilteredTasks?.filter(
      (task) =>
        task.title
          .toLowerCase()
          .includes(
            debouncedSearch.toLowerCase()
          ) ||
        task.description
          .toLowerCase()
          .includes(
            debouncedSearch.toLowerCase()
          )
    ) ?? []

  const priorityValue = {
    High: 3,
    Medium: 2,
    Low: 1,
  }

  const sortedTasks = [...searchedTasks]

  switch (sortOrder) {
    case 'high':
      sortedTasks.sort(
        (a, b) =>
          priorityValue[
          b.priority as keyof typeof priorityValue
          ] -
          priorityValue[
          a.priority as keyof typeof priorityValue
          ]
      )
      break

    case 'low':
      sortedTasks.sort(
        (a, b) =>
          priorityValue[
          a.priority as keyof typeof priorityValue
          ] -
          priorityValue[
          b.priority as keyof typeof priorityValue
          ]
      )
      break

    case 'alpha':
      sortedTasks.sort((a, b) =>
        a.title.localeCompare(
          b.title,
          undefined,
          { sensitivity: 'base' }
        )
      )
      break

    case 'due-date':
      sortedTasks.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) {
          return 0
        }

        if (!a.dueDate) {
          return 1
        }

        if (!b.dueDate) {
          return -1
        }

        return (
          new Date(a.dueDate).getTime() -
          new Date(b.dueDate).getTime()
        )
      })
      break

    case 'recent':
    default:
      break
  }

  const stats = useMemo(() => {
    const allTasks = _props.tasks ?? []

    const total = allTasks.length

    const completed = allTasks.filter(
      (task) => task.completed
    ).length

    const active = allTasks.filter(
      (task) => !task.completed
    ).length

    const overdue = allTasks.filter((task) => {
      if (!task.dueDate || task.completed) {
        return false
      }

      return (
        new Date(task.dueDate).getTime() <
        Date.now()
      )
    }).length

    const completedPercentage =
      total === 0
        ? 0
        : Math.round(
          (completed / total) * 100
        )

    return {
      total,
      completed,
      active,
      overdue,
      completedPercentage,
    }
  }, [_props.tasks])

  const [editingId, setEditingId] =
    useState<string | number | undefined>()

  const handleUpdateTask = (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: string
    }
  ) => {
    _props.dispatch?.({
      type: UPDATE_TASK,
      payload: {
        id,
        ...updates,
      },
    })

    setEditingId(undefined)
  }

  return (
    <div className={`theme-${theme}`}>

      <button
        id="theme-toggle"
        onClick={toggleTheme}
      >
        {theme === 'light'
          ? 'Dark Mode'
          : 'Light Mode'}
      </button>

      {_props.showForm && (
        <TaskForm
          onAddTask={handleAddTask}
        />
      )}

      {_props.showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          sortOrder={sortOrder}
          setSortorder={setSortorder}
          search={search}
          onSearchChange={setSearch}
          onClearSearch={() =>
            setSearch('')
          }
          isSearching={
            search !== debouncedSearch
          }
          category={category}
          categories={categories}
          onCategoryChange={setCategory}
        />
      )}

      {searchedTasks.length === 0 && (
        <p id="filter-empty-message">
          No tasks found
        </p>
      )}

      {_props.showStatsPanel && (
        <StatsPanel
          total={stats.total}
          completed={stats.completed}
          active={stats.active}
          overdue={stats.overdue}
          completedPercentage={
            stats.completedPercentage
          }
        />
      )}

      <TaskList
        tasks={sortedTasks}
        countText={`Showing ${searchedTasks.length
          } of ${_props.tasks?.length ?? 0
          } tasks`}
        onToggle={handleToggle}
        onDelete={handleDelete}
        editingId={editingId}
        onStartEdit={setEditingId}
        onCancelEdit={() =>
          setEditingId(undefined)
        }
        onUpdateTask={handleUpdateTask}
      />

    </div>
  )
}