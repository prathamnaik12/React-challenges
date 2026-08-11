interface StatusIndicatorProps {
  status?: string
}

export default function StatusIndicator({
  status,
}: StatusIndicatorProps) {
  return (
    <span data-status={status}>
      {status}
    </span>
  )
}