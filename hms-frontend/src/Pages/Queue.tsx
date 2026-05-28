import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ClockIcon, UsersIcon, ActivityIcon, PlusIcon } from 'lucide-react'
import StatusBadge  from '../Components/StatusBadge'
import  Modal  from '../Components/Modal'
const mockQueue = [
  {
    id: 1,
    patientName: 'Sarah Johnson',
    token: 'A-101',
    priority: 'Normal',
    department: 'Cardiology',
    waitTime: '15 min',
    status: 'Waiting',
  },
  {
    id: 2,
    patientName: 'Michael Chen',
    token: 'A-102',
    priority: 'Urgent',
    department: 'Emergency',
    waitTime: '5 min',
    status: 'In Consultation',
  },
  {
    id: 3,
    patientName: 'Emily Rodriguez',
    token: 'A-103',
    priority: 'Normal',
    department: 'Neurology',
    waitTime: '22 min',
    status: 'Waiting',
  },
  {
    id: 4,
    patientName: 'Robert Martinez',
    token: 'A-104',
    priority: 'Emergency',
    department: 'Emergency',
    waitTime: '2 min',
    status: 'Waiting',
  },
  {
    id: 5,
    patientName: 'Jennifer Lee',
    token: 'A-105',
    priority: 'Normal',
    department: 'Pediatrics',
    waitTime: '18 min',
    status: 'Waiting',
  },
  {
    id: 6,
    patientName: 'David Thompson',
    token: 'A-106',
    priority: 'Urgent',
    department: 'Orthopedics',
    waitTime: '8 min',
    status: 'Waiting',
  },
  {
    id: 7,
    patientName: 'Lisa Anderson',
    token: 'A-107',
    priority: 'Normal',
    department: 'Cardiology',
    waitTime: '25 min',
    status: 'Waiting',
  },
  {
    id: 8,
    patientName: 'James Wilson',
    token: 'A-108',
    priority: 'Normal',
    department: 'Neurology',
    waitTime: '12 min',
    status: 'Completed',
  },
]
const stats = [
  {
    label: 'Total in Queue',
    value: '7',
    icon: UsersIcon,
    color: 'teal',
  },
  {
    label: 'Average Wait Time',
    value: '14 min',
    icon: ClockIcon,
    color: 'blue',
  },
  {
    label: 'Currently Serving',
    value: '3',
    icon: ActivityIcon,
    color: 'amber',
  },
]
export default function Queue() {
  const [queue, setQueue] = useState(mockQueue)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    patientName: '',
    priority: 'Normal',
    department: 'Cardiology',
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Generate next token (e.g., A-109)
    const lastTokenNum = Math.max(
      ...queue.map((q) => parseInt(q.token.split('-')[1])),
    )
    const nextToken = `A-${lastTokenNum + 1}`
    const newEntry = {
      id: Math.max(...queue.map((q) => q.id)) + 1,
      patientName: formData.patientName,
      token: nextToken,
      priority: formData.priority,
      department: formData.department,
      waitTime: '0 min',
      status: 'Waiting',
    }
    setQueue([newEntry, ...queue])
    setIsModalOpen(false)
    setFormData({
      patientName: '',
      priority: 'Normal',
      department: 'Cardiology',
    })
  }
  return (
    <div className="p-8 ml-64">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Queue Management</h1>
          <p className="text-gray-500 mt-1">
            Monitor patient queue and wait times
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add to Queue</span>
        </button>
      </div>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.3,
        }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Token #
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Wait Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {queue.map((entry, index) => (
                <motion.tr
                  key={entry.id}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.3 + index * 0.05,
                  }}
                  className={`hover:bg-gray-50 transition-colors ${entry.status === 'In Consultation' ? 'bg-teal-50' : ''}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-semibold text-sm">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono font-semibold text-teal-600">
                      {entry.token}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {entry.patientName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={entry.priority} variant="priority" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {entry.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ClockIcon className="w-4 h-4" />
                      {entry.waitTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${entry.status === 'Waiting' ? 'bg-blue-100 text-blue-700' : entry.status === 'In Consultation' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}
                    >
                      {entry.status}
                    </span>
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
        title="Add Patient to Queue"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
            <div>
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
              Add to Queue
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
