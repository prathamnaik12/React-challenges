interface FilterBarProps {
  filter: "all" | "active" | "completed"
  onFilterChange: (filter: "all" | "active" | "completed") => void
  sortOrder: string
  setSortorder: (value: string) => void
  search: string
  onSearchChange: (value: string) => void
  onClearSearch: () => void
  isSearching: boolean
}

export default function FilterBar(props: FilterBarProps) {
  return (
    <div id="filter-bar" >
      <button
        data-active={props.filter === "all"}
        onClick={() => props.onFilterChange("all")}
      >
        All
      </button>
      <button
        data-active={props.filter === "active"}
        onClick={() => props.onFilterChange("active")}
      >
        Active
      </button>
      <button
        data-active={props.filter === "completed"}
        onClick={() => props.onFilterChange("completed")}
      >
        Completed
      </button>
      <select
        id="sort-order"
        value={props.sortOrder}
        onChange={(e) => props.setSortorder(e.target.value)}
      >
        <option value="recent">Recently Added</option>
        <option value="high">Priority: High to Low</option>
        <option value="low">Priority: Low to High</option>
        <option value="alpha">Alphabetical</option>
      </select>
      <input
        type="text"
        placeholder="Search tasks..."
        value={props.search}
        onChange={(e) => props.onSearchChange(e.target.value)}
      />
      {props.isSearching && (
        <p id="searching-indicator">
          Searching...
        </p>
      )}
      {props.search && (
        <button
          id="clear-search"
          onClick={props.onClearSearch}
        >
          Clear search
        </button>
      )}
    </div>
  )
}
