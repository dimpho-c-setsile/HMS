import  { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import type { Appointment } from '../types/hospital'
import { toISO, TODAY_ISO } from '../utils/date'

type CalendarMonthProps = {
  appointments: Appointment[]
  selectedDate: string
  onSelectDate: (date: string) => void
}

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export default function CalendarMonth({
  appointments,
  selectedDate,
  onSelectDate,
}: CalendarMonthProps) {
  const [initialYear, initialMonth] = (selectedDate || TODAY_ISO)
    .split('-')
    .map(Number)
  const [viewDate, setViewDate] = useState(
    new Date(initialYear, initialMonth - 1, 1),
  )

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const countFor = (iso: string) =>
    appointments.filter(
      (appointment) =>
        appointment.date === iso && appointment.status !== 'Cancelled',
    ).length

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ]

  const shiftMonth = (delta: number) =>
    setViewDate(new Date(year, month + delta, 1))

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {viewDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => shiftMonth(-1)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => shiftMonth(1)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Next month"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdays.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className="text-center text-xs font-semibold text-gray-400 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, index) => {
          if (day === null) return <div key={`empty-${index}`} />
          const iso = toISO(new Date(year, month, day))
          const count = countFor(iso)
          const isSelected = iso === selectedDate
          const isToday = iso === TODAY_ISO

          return (
            <button
              key={iso}
              onClick={() => onSelectDate(iso)}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-colors ${
                isSelected
                  ? 'bg-teal-600 text-white font-semibold'
                  : isToday
                    ? 'bg-teal-50 text-teal-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>{day}</span>
              <span
                className={`mt-0.5 h-1.5 w-1.5 rounded-full ${
                  count > 0
                    ? isSelected
                      ? 'bg-white'
                      : 'bg-teal-500'
                    : 'bg-transparent'
                }`}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
