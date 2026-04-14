import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarIcon, ClockIcon, PlusIcon } from 'lucide-react'
import { StatusBadge } from '../components/StatusBadge'
import { Modal } from '../components/Modal'
const initialMockAppointments = [
  {
    id: 1,
    patientName: 'Sarah Johnson',
    doctor: 'Dr. Dimpho Chen',
    department: 'Cardiology',
    time: '09:00 AM',
    status: 'Completed',
    date: '2026-03-30',
  },
  {
    id: 2,
    patientName: 'Robert Martinez',
    doctor: 'Dr. Emily Rodriguez',
    department: 'Neurology',
    time: '09:30 AM',
    status: 'Completed',
    date: '2026-03-30',
  },
  {
    id: 3,
    patientName: 'Jennifer Lee',
    doctor: 'Dr. James Anderson',
    department: 'Pediatrics',
    time: '10:00 AM',
    status: 'In Progress',
    date: '2026-03-30',
  },
  {
    id: 4,
    patientName: 'David Thompson',
    doctor: 'Dr. Michael Chen',
    department: 'Cardiology',
    time: '10:30 AM',
    status: 'Scheduled',
    date: '2026-03-30',
  },
  {
    id: 5,
    patientName: 'Lisa Anderson',
    doctor: 'Dr. Robert Martinez',
    department: 'Orthopedics',
    time: '11:00 AM',
    status: 'Scheduled',
    date: '2026-03-30',
  },
  {
    id: 6,
    patientName: 'James Wilson',
    doctor: 'Dr. Christopher Brown',
    department: 'Emergency',
    time: '11:30 AM',
    status: 'Cancelled',
    date: '2026-03-30',
  },
  {
    id: 7,
    patientName: 'Maria Garcia',
    doctor: 'Dr. James Anderson',
    department: 'Pediatrics',
    time: '01:00 PM',
    status: 'Scheduled',
    date: '2026-03-30',
  },
  {
    id: 8,
    patientName: 'Christopher Brown',
    doctor: 'Dr. Emily Rodriguez',
    department: 'Neurology',
    time: '01:30 PM',
    status: 'Scheduled',
    date: '2026-03-30',
  },
  {
    id: 9,
    patientName: 'Emily Rodriguez',
    doctor: 'Dr. Michael Chen',
    department: 'Cardiology',
    time: '02:00 PM',
    status: 'Scheduled',
    date: '2026-03-30',
  },
  {
    id: 10,
    patientName: 'Michael Chen',
    doctor: 'Dr. Robert Martinez',
    department: 'Orthopedics',
    time: '02:30 PM',
    status: 'Scheduled',
    date: '2026-03-30',
  },
]
export function Appointments() {
  const [appointments, setAppointments] = useState(initialMockAppointments)
  const [selectedDate] = useState('2026-03-30')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    patientName: '',
    doctor: '',
    department: 'Cardiology',
    time: '',
    date: '2026-03-30',
    status: 'Scheduled',
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Format time from 24h to 12h AM/PM
    const timeParts = formData.time.split(':')
    const hours = parseInt(timeParts[0])
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12
    const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${timeParts[1]} ${ampm}`
    const newAppointment = {
      id: Math.max(...appointments.map((a) => a.id)) + 1,
      patientName: formData.patientName,
      doctor: formData.doctor,
      department: formData.department,
      time: formattedTime,
      date: formData.date,
      status: formData.status,
    }
    setAppointments([newAppointment, ...appointments])
    setIsModalOpen(false)
    setFormData({
      patientName: '',
      doctor: '',
      department: 'Cardiology',
      time: '',
      date: '2026-03-30',
      status: 'Scheduled',
    })
  }
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-500 mt-1">
            Manage patient appointments and schedules
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span>New Appointment</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-4">
          <CalendarIcon className="w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">Today:</span>
            <span>March 30, 2026</span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map((appointment, index) => (
                <motion.tr
                  key={appointment.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                      <ClockIcon className="w-4 h-4 text-gray-400" />
                      {appointment.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {appointment.patientName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {appointment.doctor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {appointment.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge
                      status={appointment.status}
                      variant="appointment"
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Appointment"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name
              </label>
              <input
                type="text"
                required
                value={formData.patientName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    patientName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor
              </label>
              <input
                type="text"
                required
                value={formData.doctor}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    doctor: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                placeholder="e.g. Dr. Michael Chen"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                value={formData.department}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    department: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Emergency">Emergency</option>
                <option value="Orthopedics">Orthopedics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    date: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    time: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700"
            >
              Save Appointment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
