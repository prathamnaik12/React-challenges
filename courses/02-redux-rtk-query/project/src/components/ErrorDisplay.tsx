interface ErrorDisplayProps {
  error: unknown
  onRetry?: () => void
}

export default function ErrorDisplay({
  error,
  onRetry,
}: ErrorDisplayProps) {
  const message =
    error instanceof Error ? error.message : 'Failed to load data'

  return (
    <div data-testid="error-display">
      <p>{message}</p>

      {onRetry && (
        <button data-testid="retry-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}