interface StatsPanelProps {
  total?: number
  completed?: number
  active?: number
  overdue?: number
  completedPercentage?: number
}

export default function StatsPanel(_props: StatsPanelProps) {
  return (
    <section id="stats-panel">
      <div>
        <p>Total: {_props.total ?? 0}</p>
      </div>

      <div>
        <p>
          Completed: {_props.completed ?? 0}
        </p>
        <p>
          Completion: {_props.completedPercentage ?? 0}%
        </p>

        <div
          role="progressbar"
          aria-valuenow={_props.completedPercentage ?? 0}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            style={{
              width: `${_props.completedPercentage ?? 0}%`,
              height: "10px",
            }}
          />
        </div>
      </div>

      <div>
        <p>Active: {_props.active ?? 0}</p>
      </div>

      <div>
        <p>Overdue: {_props.overdue ?? 0}</p>
      </div>
    </section>
  )
}