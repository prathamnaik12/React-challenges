import { useEffect, useRef } from "react"
import Button from "./Button"
import FormInput from "./FormInput"

interface FilterBarProps {
  filter: "all" | "active" | "completed"
  onFilterChange: (filter: "all" | "active" | "completed") => void
  sortOrder: string
  setSortorder: (value: string) => void
  search: string
  onSearchChange: (value: string) => void
  onClearSearch: () => void
  isSearching: boolean
  category: string
  categories: string[]
  onCategoryChange: (category: string) => void
}

export default function FilterBar(props: FilterBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  return (
    <div id="filter-bar">
      <Button
        data-active={props.filter === "all"}
        onClick={() => props.onFilterChange("all")}
      >
        All
      </Button>

      <Button
        data-active={props.filter === "active"}
        onClick={() => props.onFilterChange("active")}
      >
        Active
      </Button>

      <Button
        data-active={props.filter === "completed"}
        onClick={() => props.onFilterChange("completed")}
      >
        Completed
      </Button>

      <select
        id="category-filter"
        value={props.category}
        onChange={(e) =>
          props.onCategoryChange(e.target.value)
        }
      >
        <option value="all">All categories</option>

        {(props.categories ?? []).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        id="sort-order"
        value={props.sortOrder}
        onChange={(e) =>
          props.setSortorder(e.target.value)
        }
      >
        <option value="recent">Recently Added</option>
        <option value="high">Priority: High to Low</option>
        <option value="low">Priority: Low to High</option>
        <option value="alpha">Alphabetical</option>
        <option value="due-date">
          Due Date (Soonest First)
        </option>
      </select>

      <FormInput
        id="search-input"
        ref={searchInputRef}
        type="text"
        placeholder="Search tasks..."
        value={props.search}
        onChange={(e) =>
          props.onSearchChange(e.target.value)
        }
      />

      {props.isSearching && (
        <p id="searching-indicator">
          Searching...
        </p>
      )}

      {props.search && (
        <Button
          id="clear-search"
          onClick={props.onClearSearch}
        >
          Clear search
        </Button>
      )}
    </div>
  )
}