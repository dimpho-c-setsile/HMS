'use client';

import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  CalendarCheckIcon,
  StethoscopeIcon,
  CheckCircleIcon,
  ClipboardCheckIcon,
  ArrowRightIcon,
} from 'lucide-react'
import  StatCard  from '../Components/StatCard'
import  StatusBadge  from '../Components/StatusBadge'
 import  CalendarMonth  from '../Components/CalendarMonth'
import { useHospital } from '../contexts/HospitalContext'
import { useAuth } from '../contexts/AuthContext'
import {
  TODAY_ISO,
  formatLongDate,
  formatShortDate,
  sortByTime,
} from '../utils/date'

export default function DoctorDashboard() {
  const { user } = useAuth()
  const { appointments, prescriptions } = useHospital()
  const [selectedDate, setSelectedDate] = useState(TODAY_ISO)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000)
    return () => window.clearInterval(timer)
  }, [])

  const mine = appointments.filter(
    (appointment) => appointment.doctor === user?.name,
  )
  const todays = mine.filter((appointment) => appointment.date === TODAY_ISO)
  const selected = mine
    .filter((appointment) => appointment.date === selectedDate)
    .sort((a, b) => sortByTime(a.time, b.time))

  const inConsultation = todays.filter(
    (appointment) => appointment.status === 'In Progress',
  ).length
  const completed = todays.filter(
    (appointment) => appointment.status === 'Completed',
  ).length
  const myPrescriptions = prescriptions.filter(
    (prescription) => prescription.prescribedBy === user?.name,
  ).length

  return (
    <div className="p-8">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name.replace('Dr. ', 'Dr ')}
          </h1>
          <p className="text-gray-500 mt-1">{user?.title}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-gray-900 tabular-nums">
            {now.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <p className="text-sm text-gray-500">{formatLongDate(TODAY_ISO)}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          index={0}
          label="Appointments Assigned"
          value={todays.length}
          icon={CalendarCheckIcon}
          tone="teal"
          hint="Scheduled for today"
        />
        <StatCard
          index={1}
          label="In Consultation"
          value={inConsultation}
          icon={StethoscopeIcon}
          tone="amber"
        />
        <StatCard
          index={2}
          label="Completed Consultations"
          value={completed}
          icon={CheckCircleIcon}
          tone="green"
        />
        <StatCard
          index={3}
          label="Prescriptions Written"
          value={myPrescriptions}
          icon={ClipboardCheckIcon}
          tone="blue"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="xl:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedDate === TODAY_ISO
                  ? "Today's clinic"
                  : formatShortDate(selectedDate)}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {selected.length} appointment{selected.length === 1 ? '' : 's'}
              </p>
            </div>
            <Link
              to="/appointments"
              className="text-sm font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              Open list
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          {selected.length === 0 ? (
            <p className="p-6 text-sm text-gray-500">
              No appointments assigned for this day.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {selected.map((appointment) => (
                <li
                  key={appointment.id}
                  className="flex items-center gap-4 px-6 py-4"
                >
                  <span className="text-sm font-semibold text-gray-900 w-20 shrink-0 tabular-nums">
                    {appointment.time}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {appointment.patientName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {appointment.reason}
                    </p>
                  </div>
                  <StatusBadge
                    status={appointment.status}
                    variant="appointment"
                  />
                </li>
              ))}
            </ul>
          )}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <CalendarMonth
            appointments={mine}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
          <p className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
            Dots mark days with assigned appointments.
          </p>
        </motion.section>
      </div>
    </div>
  )
}
