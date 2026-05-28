import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { SearchIcon, PlusIcon } from 'lucide-react'
import  StatusBadge  from '../Components/StatusBadge'
import Modal  from '../Components/Modal'
const initialMockPatients = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 34,
    gender: 'Female',
    contact: '(555) 123-4567',
    condition: 'Cardiac Arrhythmia',
    status: 'Admitted',
    admissionDate: '2026-03-28',
  },
  {
    id: 2,
    name: 'Michael Chen',
    age: 45,
    gender: 'Male',
    contact: '(555) 234-5678',
    condition: 'Fractured Tibia',
    status: 'Admitted',
    admissionDate: '2026-03-29',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    age: 28,
    gender: 'Female',
    contact: '(555) 345-6789',
    condition: 'Migraine',
    status: 'Outpatient',
    admissionDate: '2026-03-30',
  },
  {
    id: 4,
    name: 'Robert Martinez',
    age: 56,
    gender: 'Male',
    contact: '(555) 456-7890',
    condition: 'Pneumonia',
    status: 'Discharged',
    admissionDate: '2026-03-25',
  },
  {
    id: 5,
    name: 'Jennifer Lee',
    age: 41,
    gender: 'Female',
    contact: '(555) 567-8901',
    condition: 'Appendicitis',
    status: 'Critical',
    admissionDate: '2026-03-30',
  },
  {
    id: 6,
    name: 'David Thompson',
    age: 62,
    gender: 'Male',
    contact: '(555) 678-9012',
    condition: 'Diabetes Checkup',
    status: 'Outpatient',
    admissionDate: '2026-03-30',
  },
  {
    id: 7,
    name: 'Lisa Anderson',
    age: 39,
    gender: 'Female',
    contact: '(555) 789-0123',
    condition: 'Hypertension',
    status: 'Admitted',
    admissionDate: '2026-03-27',
  },
  {
    id: 8,
    name: 'James Wilson',
    age: 51,
    gender: 'Male',
    contact: '(555) 890-1234',
    condition: 'Back Pain',
    status: 'Outpatient',
    admissionDate: '2026-03-30',
  },
  {
    id: 9,
    name: 'Maria Garcia',
    age: 33,
    gender: 'Female',
    contact: '(555) 901-2345',
    condition: 'Asthma',
    status: 'Discharged',
    admissionDate: '2026-03-26',
  },
  {
    id: 10,
    name: 'Christopher Brown',
    age: 47,
    gender: 'Male',
    contact: '(555) 012-3456',
    condition: 'Stroke Recovery',
    status: 'Admitted',
    admissionDate: '2026-03-28',
  },
]
const statusFilters = [
  'All',
  'Admitted',
  'Outpatient',
  'Discharged',
  'Critical',
]
export default function Patients() {
  const [patients, setPatients] = useState(initialMockPatients)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    contact: '',
    condition: '',
    status: 'Admitted',
    admissionDate: new Date().toISOString().split('T')[0],
  })
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === 'All' || patient.status === statusFilter
    return matchesSearch && matchesStatus
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPatient = {
      id: Math.max(...patients.map((p) => p.id)) + 1,
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      contact: formData.contact,
      condition: formData.condition,
      status: formData.status,
      admissionDate: formData.admissionDate,
    }
    setPatients([newPatient, ...patients])
    setIsModalOpen(false)
    setFormData({
      name: '',
      age: '',
      gender: 'Male',
      contact: '',
      condition: '',
      status: 'Admitted',
      admissionDate: new Date().toISOString().split('T')[0],
    })
  }
  return (
    <div className="p-8 ml-64">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-500 mt-1">Manage and view patient records</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Patient</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients by name or condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex gap-2">
            {statusFilters.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === status ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {status}
              </button>
            ))}
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
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Admission Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPatients.map((patient, index) => (
                <motion.tr
                  key={patient.id}
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
                    <div className="font-medium text-gray-900">
                      {patient.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {patient.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {patient.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {patient.condition}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={patient.status} variant="patient" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {patient.admissionDate}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No patients found matching your criteria
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Patient"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.age}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    age: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gender: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="text"
                required
                value={formData.contact}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Condition
              </label>
              <input
                type="text"
                required
                value={formData.condition}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    condition: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
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
                <option value="Admitted">Admitted</option>
                <option value="Outpatient">Outpatient</option>
                <option value="Discharged">Discharged</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admission Date
              </label>
              <input
                type="date"
                required
                value={formData.admissionDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    admissionDate: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              />
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
              Save Patient
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
