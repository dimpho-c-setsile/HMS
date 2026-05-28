
type StatusBadgeProps = {
  status: string
  variant?: 'patient' | 'appointment' | 'stock' | 'priority'
}
export default function StatusBadge({ status, variant = 'patient' }: StatusBadgeProps) {
  const getStyles = () => {
    const normalized = status.toLowerCase()
    if (variant === 'patient') {
      if (normalized === 'discharged') return 'bg-green-100 text-green-700'
      if (normalized === 'outpatient') return 'bg-blue-100 text-blue-700'
      if (normalized === 'admitted') return 'bg-amber-100 text-amber-700'
      if (normalized === 'critical') return 'bg-red-100 text-red-700'
    }
    if (variant === 'appointment') {
      if (normalized === 'completed') return 'bg-green-100 text-green-700'
      if (normalized === 'scheduled') return 'bg-blue-100 text-blue-700'
      if (normalized === 'in progress') return 'bg-amber-100 text-amber-700'
      if (normalized === 'cancelled') return 'bg-red-100 text-red-700'
    }
    if (variant === 'stock') {
      if (normalized === 'in stock') return 'bg-green-100 text-green-700'
      if (normalized === 'low stock') return 'bg-amber-100 text-amber-700'
      if (normalized === 'out of stock') return 'bg-red-100 text-red-700'
    }
    if (variant === 'priority') {
      if (normalized === 'normal') return 'bg-green-100 text-green-700'
      if (normalized === 'urgent') return 'bg-amber-100 text-amber-700'
      if (normalized === 'emergency') return 'bg-red-100 text-red-700'
    }
    return 'bg-gray-100 text-gray-700'
  }
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStyles()}`}
    >
      {status}
    </span>
  )
}
