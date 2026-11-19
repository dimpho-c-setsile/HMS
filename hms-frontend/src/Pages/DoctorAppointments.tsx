'use client';
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PlusIcon, StethoscopeIcon, FileTextIcon } from 'lucide-react'
import  StatusBadge  from '../Components/StatusBadge'
import  Modal  from '../Components/Modal'
import { useHospital } from '../contexts/HospitalContext'
import { useAuth } from '../contexts/AuthContext'
import { DEPARTMENTS, type Appointment } from '../types/hospital'
import { TODAY_ISO, formatShortDate, sortByTime, to12Hour } from '../utils/date'

const dateFilters = ['Today', 'Upcoming', 'Past', 'All']

const emptyBooking = {
  patientName: '',
  department: '',
  date: TODAY_ISO,
  time: '',
  reason: '',
}

const emptyConsult = {
  diagnosis: '',
  medicine: '',
  dosage: '',
  notes: '',
}

export default function DoctorAppointments() {
  const { user } = useAuth()
  const {
    appointments,
    patients,
    medicines,
    addAppointment,
    updateAppointment,
    setAppointmentStatus,
    addPrescription,
  } = useHospital()

  const [dateFilter, setDateFilter] = useState('Today')
  const [isBookingOpen, setBookingOpen] = useState(false)
  const [consulting, setConsulting] = useState<Appointment | null>(null)
  const [booking, setBooking] = useState({
    ...emptyBooking,
    department: user?.department ?? DEPARTMENTS[0],
  })
  const [consult, setConsult] = useState(emptyConsult)

  const mine = appointments.filter(
    (appointment) => appointment.doctor === user?.name,
  )

  const visible = mine
    .filter((appointment) => {
      if (dateFilter === 'Today') return appointment.date === TODAY_ISO
      if (dateFilter === 'Upcoming') return appointment.date > TODAY_ISO
      if (dateFilter === 'Past') return appointment.date < TODAY_ISO
      return true
    })
    .sort((a, b) =>
      a.date === b.date
        ? sortByTime(a.time, b.time)
        : a.date.localeCompare(b.date),
    )

  const submitBooking = (event: React.FormEvent) => {
    event.preventDefault()
    addAppointment({
      patientName: booking.patientName,
      doctor: user?.name ?? 'Unassigned',
      department: booking.department,
      date: booking.date,
      time: to12Hour(booking.time),
      status: 'Scheduled',
      reason: booking.reason,
    })
    setBooking({ ...emptyBooking, department: user?.department ?? DEPARTMENTS[0] })
    setBookingOpen(false)
  }

  const submitConsult = (event: React.FormEvent) => {
    event.preventDefault()
    if (!consulting) return
    addPrescription({
      patientName: consulting.patientName,
      medicine: consult.medicine,
      dosage: consult.dosage,
      diagnosis: consult.diagnosis,
      notes: consult.notes,
      prescribedBy: user?.name ?? 'Unassigned',
      department: consulting.department,
      dateIssued: TODAY_ISO,
      status: 'Pending',
    })
    updateAppointment(consulting.id, {
      status: 'Completed',
      diagnosis: consult.diagnosis,
    })
    setConsult(emptyConsult)
    setConsulting(null)
  }

  return (
    <div className="p-8">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-500 mt-1">
            Consultations assigned to you across {user?.department}
          </p>
        </div>
        <button
          onClick={() => setBookingOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span>New Appointment</span>
        </button>
      </header>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex flex-wrap gap-2">
        {dateFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setDateFilter(filter)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              dateFilter === filter
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date &amp; Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Reason / Diagnosis
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {visible.map((appointment, index) => (
                <motion.tr
                  key={appointment.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: Math.min(index * 0.03, 0.24),
                  }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {appointment.time}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatShortDate(appointment.date)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {appointment.patientName}
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-sm text-gray-900 truncate">
                      {appointment.reason}
                    </p>
                    {appointment.diagnosis && (
                      <p className="text-xs text-teal-700 truncate mt-0.5">
                        {appointment.diagnosis}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge
                      status={appointment.status}
                      variant="appointment"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {appointment.status === 'Scheduled' && (
                        <button
                          onClick={() =>
                            setAppointmentStatus(appointment.id, 'In Progress')
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
                        >
                          <StethoscopeIcon className="w-3.5 h-3.5" />
                          Start
                        </button>
                      )}
                      {(appointment.status === 'Scheduled' ||
                        appointment.status === 'In Progress') && (
                        <button
                          onClick={() => setConsulting(appointment)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-teal-800 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors"
                        >
                          <FileTextIcon className="w-3.5 h-3.5" />
                          Diagnose
                        </button>
                      )}
                      {(appointment.status === 'Completed' ||
                        appointment.status === 'Cancelled') && (
                        <span className="text-xs text-gray-400">
                          No actions
                        </span>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {visible.length === 0 && (
            <p className="p-6 text-sm text-gray-500">
              No appointments match this filter.
            </p>
          )}
        </div>
      </motion.div>

      <Modal
        isOpen={isBookingOpen}
        onClose={() => setBookingOpen(false)}
        title="New Appointment"
      >
        <form onSubmit={submitBooking} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient
              </label>
              <select
                required
                value={booking.patientName}
                onChange={(event) =>
                  setBooking({ ...booking, patientName: event.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select a patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.name}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                value={booking.department}
                onChange={(event) =>
                  setBooking({ ...booking, department: event.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {DEPARTMENTS.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={booking.date}
                onChange={(event) =>
                  setBooking({ ...booking, date: event.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                required
                value={booking.time}
                onChange={(event) =>
                  setBooking({ ...booking, time: event.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for visit
              </label>
              <input
                type="text"
                required
                value={booking.reason}
                onChange={(event) =>
                  setBooking({ ...booking, reason: event.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setBookingOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={consulting !== null}
        onClose={() => setConsulting(null)}
        title={`Consultation — ${consulting?.patientName ?? ''}`}
      >
        <form onSubmit={submitConsult} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Diagnosis
            </label>
            <textarea
              required
              rows={3}
              value={consult.diagnosis}
              onChange={(event) =>
                setConsult({ ...consult, diagnosis: event.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Clinical findings and assessment"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medicine
              </label>
              <select
                required
                value={consult.medicine}
                onChange={(event) =>
                  setConsult({ ...consult, medicine: event.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select medicine</option>
                {medicines.map((medicine) => (
                  <option key={medicine.id} value={medicine.name}>
                    {medicine.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dosage
              </label>
              <input
                type="text"
                required
                value={consult.dosage}
                onChange={(event) =>
                  setConsult({ ...consult, dosage: event.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="1 tablet, 2x daily"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes for pharmacy
            </label>
            <input
              type="text"
              value={consult.notes}
              onChange={(event) =>
                setConsult({ ...consult, notes: event.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <p className="text-xs text-gray-500">
            Saving marks the consultation complete and sends the prescription to
            the pharmacy queue.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setConsulting(null)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700"
            >
              Save &amp; Prescribe
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
