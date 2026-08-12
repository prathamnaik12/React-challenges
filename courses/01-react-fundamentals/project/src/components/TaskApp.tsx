import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  type Dispatch,
} from "react"

import type { Task } from "./TaskList"
import TaskList from "./TaskList"
import TaskForm from "./TaskForm"
import FilterBar from "./FilterBar"
import StatsPanel from "./StatsPanel"
import { useTheme } from "../contexts/ThemeContext"

import {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  type TaskAction,
} from "../reducers/taskReducre"

interface TaskAppProps {
  tasks?: Task[]
  dispatch?: Dispatch<TaskAction>
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  linkToTaskDetail?: boolean
}

function TaskApp({
  tasks = [],
  dispatch,
  showForm,
  showFilterBar,
  showStatsPanel,
  linkToTaskDetail,
}: TaskAppProps) {
  const { theme, toggleTheme } = useTheme()

  const [filter, setFilter] = useState<
    "all" | "active" | "completed"
  >("all")

  const [sortOrder, setSortorder] = useState("recent")
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [category, setCategory] = useState("all")

  const [editingId, setEditingId] =
    useState<string | number | undefined>()

  const handleAddTask = useCallback(
    (task: Record<string, unknown>) => {
      dispatch?.({
        type: ADD_TASK,
        payload: task as unknown as Task,
      })
    },
    [dispatch]
  )

  const handleToggle = useCallback(
    (id: string | number) => {
      dispatch?.({
        type: TOGGLE_TASK,
        payload: id,
      })
    },
    [dispatch]
  )

  const handleDelete = useCallback(
    (id: string | number) => {
      if (window.confirm("Are you sure?")) {
        dispatch?.({
          type: DELETE_TASK,
          payload: id,
        })
      }
    },
    [dispatch]
  )

  const handleUpdateTask = useCallback(
    (
      id: string | number,
      updates: {
        title: string
        description: string
        priority: string
      }
    ) => {
      dispatch?.({
        type: UPDATE_TASK,
        payload: {
          id,
          ...updates,
        },
      })

      setEditingId(undefined)
    },
    [dispatch]
  )

  const handleCancelEdit = useCallback(() => {
    setEditingId(undefined)
  }, [])

  const handleClearSearch = useCallback(() => {
    setSearch("")
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => clearTimeout(timer)
  }, [search])

  const categories = useMemo(() => {
    return [
      ...new Set(
        tasks
          .map((task) => task.category)
          .filter(Boolean)
      ),
    ]
  }, [tasks])

  const sortedTasks = useMemo(() => {
    const filteredTasks =
      filter === "all"
        ? tasks
        : filter === "active"
          ? tasks.filter((task) => !task.completed)
          : tasks.filter((task) => task.completed)

    const categoryFilteredTasks =
      category === "all"
        ? filteredTasks
        : filteredTasks.filter(
          (task) => task.category === category
        )

    const searchedTasks =
      categoryFilteredTasks.filter(
        (task) =>
          task.title
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase()) ||
          task.description
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase())
      )

    const priorityValue = {
      High: 3,
      Medium: 2,
      Low: 1,
    }

    const result = [...searchedTasks]

    switch (sortOrder) {
      case "high":
        result.sort(
          (a, b) =>
            priorityValue[
            b.priority as keyof typeof priorityValue
            ] -
            priorityValue[
            a.priority as keyof typeof priorityValue
            ]
        )
        break

      case "low":
        result.sort(
          (a, b) =>
            priorityValue[
            a.priority as keyof typeof priorityValue
            ] -
            priorityValue[
            b.priority as keyof typeof priorityValue
            ]
        )
        break

      case "alpha":
        result.sort((a, b) =>
          a.title.localeCompare(
            b.title,
            undefined,
            { sensitivity: "base" }
          )
        )
        break

      case "due-date":
        result.sort((a, b) => {
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

      case "recent":
      default:
        break
    }

    return result
  }, [
    tasks,
    filter,
    category,
    debouncedSearch,
    sortOrder,
  ])

  const stats = useMemo(() => {
    const total = tasks.length

    const completed = tasks.filter(
      (task) => task.completed
    ).length

    const active = tasks.filter(
      (task) => !task.completed
    ).length

    const overdue = tasks.filter((task) => {
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
  }, [tasks])

  return (
    <div className={`theme-${theme}`}>
      <button
        id="theme-toggle"
        onClick={toggleTheme}
      >
        {theme === "light"
          ? "Dark Mode"
          : "Light Mode"}
      </button>

      {showForm && (
        <TaskForm
          onAddTask={handleAddTask}
        />
      )}

      {showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          sortOrder={sortOrder}
          setSortorder={setSortorder}
          search={search}
          onSearchChange={setSearch}
          onClearSearch={handleClearSearch}
          isSearching={
            search !== debouncedSearch
          }
          category={category}
          categories={categories}
          onCategoryChange={setCategory}
        />
      )}

      {sortedTasks.length === 0 && (
        <p id="filter-empty-message">
          No tasks found
        </p>
      )}

      {showStatsPanel && (
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
        countText={`Showing ${sortedTasks.length} of ${tasks.length} tasks`}
        onToggle={handleToggle}
        onDelete={handleDelete}
        editingId={editingId}
        onStartEdit={setEditingId}
        onCancelEdit={handleCancelEdit}
        onUpdateTask={handleUpdateTask}
        linkToTaskDetail={linkToTaskDetail}
      />
    </div>
  )
}

export default React.memo(TaskApp)