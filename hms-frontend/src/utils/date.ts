export function toISO(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function shiftISO(days: number): string {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return toISO(date)
}

export const TODAY_ISO = toISO(new Date())

export function formatLongDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatShortDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function to12Hour(value: string): string {
  if (!value) return ''
  const [rawHours, minutes] = value.split(':')
  const hours = parseInt(rawHours, 10)
  const suffix = hours >= 12 ? 'PM' : 'AM'
  const normalized = hours % 12 || 12
  return `${String(normalized).padStart(2, '0')}:${minutes} ${suffix}`
}

export function sortByTime(a: string, b: string): number {
  const parse = (value: string) => {
    const [clock, suffix] = value.split(' ')
    const [hours, minutes] = clock.split(':').map(Number)
    const normalized = suffix === 'PM' && hours !== 12 ? hours + 12 : suffix === 'AM' && hours === 12 ? 0 : hours
    return normalized * 60 + minutes
  }
  return parse(a) - parse(b)
}
