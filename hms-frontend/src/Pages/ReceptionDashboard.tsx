
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  UsersIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClipboardListIcon,
  PackageCheckIcon,
  ArrowRightIcon,
} from 'lucide-react'
import  StatCard from '../Components/StatCard'
import  StatusBadge  from '../Components/StatusBadge'
import { useHospital } from '../contexts/HospitalContext'
import { useAuth } from '../contexts/AuthContext'
import { TODAY_ISO, formatLongDate, sortByTime } from '../utils/date'

export default function ReceptionDashboard() {
  const { user } = useAuth()
  const { patients, appointments, queue, prescriptions } = useHospital()

  const todaysAppointments = appointments
    .filter((appointment) => appointment.date === TODAY_ISO)
    .sort((a, b) => sortByTime(a.time, b.time))
  const waiting = queue.filter((entry) => entry.status !== 'Completed')
  const completedConsultations = queue.filter(
    (entry) => entry.status === 'Completed',
  ).length
  const collected = prescriptions.filter(
    (prescription) => prescription.status === 'Collected',
  ).length

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Good day, {user?.name.split(' ')[0]}
        </h1>
        <p className="text-gray-500 mt-1">{formatLongDate(TODAY_ISO)}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          index={0}
          label="Registered Patients"
          value={patients.length}
          icon={UsersIcon}
          tone="teal"
        />
        <StatCard
          index={1}
          label="Appointments Today"
          value={todaysAppointments.length}
          icon={CalendarIcon}
          tone="blue"
        />
        <StatCard
          index={2}
          label="Completed Consultations"
          value={completedConsultations}
          icon={CheckCircleIcon}
          tone="green"
        />
        <StatCard
          index={3}
          label="Medication Collected"
          value={collected}
          icon={PackageCheckIcon}
          tone="amber"
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
            <h2 className="text-lg font-semibold text-gray-900">
              Today's schedule
            </h2>
            <Link
              to="/appointments"
              className="text-sm font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              All appointments
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {todaysAppointments.slice(0, 7).map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {appointment.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.patientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {appointment.doctor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge
                        status={appointment.status}
                        variant="appointment"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {todaysAppointments.length === 0 && (
              <p className="p-6 text-sm text-gray-500">
                No appointments booked for today yet.
              </p>
            )}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Live queue
            </h2>
            <Link
              to="/queue"
              className="text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              Manage
            </Link>
          </div>
          {waiting.length === 0 ? (
            <p className="text-sm text-gray-500">The queue is empty.</p>
          ) : (
            <ul className="space-y-3">
              {waiting.slice(0, 6).map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <span className="font-mono text-sm font-semibold text-teal-700 w-14 shrink-0">
                    {entry.token}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {entry.patientName}
                    </p>
                    <p className="text-xs text-gray-500">{entry.department}</p>
                  </div>
                  <StatusBadge status={entry.priority} variant="priority" />
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
            <ClipboardListIcon className="w-4 h-4" />
            {waiting.length} patients currently waiting
          </div>
        </motion.section>
      </div>
    </div>
  )
}
