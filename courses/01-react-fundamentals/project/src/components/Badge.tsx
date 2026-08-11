interface BadgeProps {
  children?: React.ReactNode
  variant?: string
  type?: string
}

export default function Badge({
  children,
  variant,
  type,
}: BadgeProps) {
  return (
    <span
      data-variant={variant}
      data-type={type}
    >
      {children}
    </span>
  )
}