import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  SearchIcon,
  CheckCircleIcon,
  ClockIcon,
  PackageIcon,
  AlertCircleIcon,
} from 'lucide-react'
type Prescription = {
  id: number
  patientName: string
  medicine: string
  dosage: string
  prescribedBy: string
  dateIssued: string
  status: 'Pending' | 'Ready for Pickup' | 'Collected' | 'Cancelled'
}
const initialPrescriptions: Prescription[] = [
  {
    id: 1,
    patientName: 'Sarah Johnson',
    medicine: 'Amoxicillin 500mg',
    dosage: '3x daily for 7 days',
    prescribedBy: 'Dr. Michael Chen',
    dateIssued: '2026-04-08',
    status: 'Ready for Pickup',
  },
  {
    id: 2,
    patientName: 'Michael Chen',
    medicine: 'Ibuprofen 400mg',
    dosage: '2x daily as needed',
    prescribedBy: 'Dr. Robert Martinez',
    dateIssued: '2026-04-08',
    status: 'Pending',
  },
  {
    id: 3,
    patientName: 'Emily Rodriguez',
    medicine: 'Lisinopril 10mg',
    dosage: '1x daily',
    prescribedBy: 'Dr. Emily Rodriguez',
    dateIssued: '2026-04-07',
    status: 'Collected',
  },
  {
    id: 4,
    patientName: 'Robert Martinez',
    medicine: 'Metformin 850mg',
    dosage: '2x daily with meals',
    prescribedBy: 'Dr. James Anderson',
    dateIssued: '2026-04-08',
    status: 'Ready for Pickup',
  },
  {
    id: 5,
    patientName: 'Jennifer Lee',
    medicine: 'Omeprazole 20mg',
    dosage: '1x daily before breakfast',
    prescribedBy: 'Dr. Christopher Brown',
    dateIssued: '2026-04-08',
    status: 'Pending',
  },
  {
    id: 6,
    patientName: 'David Thompson',
    medicine: 'Atorvastatin 20mg',
    dosage: '1x daily at bedtime',
    prescribedBy: 'Dr. Michael Chen',
    dateIssued: '2026-04-07',
    status: 'Collected',
  },
  {
    id: 7,
    patientName: 'Lisa Anderson',
    medicine: 'Azithromycin 250mg',
    dosage: '1x daily for 5 days',
    prescribedBy: 'Dr. Emily Rodriguez',
    dateIssued: '2026-04-08',
    status: 'Ready for Pickup',
  },
  {
    id: 8,
    patientName: 'James Wilson',
    medicine: 'Paracetamol 500mg',
    dosage: '4x daily as needed',
    prescribedBy: 'Dr. Robert Martinez',
    dateIssued: '2026-04-08',
    status: 'Pending',
  },
  {
    id: 9,
    patientName: 'Maria Garcia',
    medicine: 'Vitamin D3 1000IU',
    dosage: '1x daily',
    prescribedBy: 'Dr. James Anderson',
    dateIssued: '2026-04-07',
    status: 'Cancelled',
  },
  {
    id: 10,
    patientName: 'Christopher Brown',
    medicine: 'Insulin Glargine 100U/mL',
    dosage: '1x daily at bedtime',
    prescribedBy: 'Dr. Michael Chen',
    dateIssued: '2026-04-08',
    status: 'Pending',
  },
]
const statusFilters = [
  'All',
  'Pending',
  'Ready for Pickup',
  'Collected',
  'Cancelled',
]
function getStatusStyle(status: string) {
  switch (status) {
    case 'Pending':
      return 'bg-amber-100 text-amber-700'
    case 'Ready for Pickup':
      return 'bg-blue-100 text-blue-700'
    case 'Collected':
      return 'bg-green-100 text-green-700'
    case 'Cancelled':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}
export default function Prescriptions() {
  const [prescriptions, setPrescriptions] =
    useState<Prescription[]>(initialPrescriptions)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const filteredPrescriptions = prescriptions.filter((p) => {
    const matchesSearch =
      p.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.medicine.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter
    return matchesSearch && matchesStatus
  })
  const pendingCount = prescriptions.filter(
    (p) => p.status === 'Pending',
  ).length
  const readyCount = prescriptions.filter(
    (p) => p.status === 'Ready for Pickup',
  ).length
  const collectedCount = prescriptions.filter(
    (p) => p.status === 'Collected',
  ).length
  const updateStatus = (id: number, newStatus: Prescription['status']) => {
    setPrescriptions((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: newStatus,
            }
          : p,
      ),
    )
  }
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Prescription Dispensing
        </h1>
        <p className="text-gray-500 mt-1">
          Track and manage prescription collections
        </p>
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
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0,
          }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pending</p>
              <p className="text-3xl font-bold text-gray-900">{pendingCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-100">
              <ClockIcon className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Ready for Pickup</p>
              <p className="text-3xl font-bold text-gray-900">{readyCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <PackageIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Collected Today</p>
              <p className="text-3xl font-bold text-gray-900">
                {collectedCount}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by patient name or medicine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {statusFilters.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${statusFilter === status ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
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
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Medicine & Dosage
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Prescribed By
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date Issued
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
              {filteredPrescriptions.map((prescription, index) => (
                <motion.tr
                  key={prescription.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.04,
                  }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {prescription.patientName}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {prescription.medicine}
                    </div>
                    <div className="text-sm text-gray-500">
                      {prescription.dosage}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {prescription.prescribedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {prescription.dateIssued}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(prescription.status)}`}
                    >
                      {prescription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {prescription.status === 'Pending' && (
                        <button
                          onClick={() =>
                            updateStatus(prescription.id, 'Ready for Pickup')
                          }
                          className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          Mark Ready
                        </button>
                      )}
                      {prescription.status === 'Ready for Pickup' && (
                        <button
                          onClick={() =>
                            updateStatus(prescription.id, 'Collected')
                          }
                          className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          Mark Collected
                        </button>
                      )}
                      {(prescription.status === 'Pending' ||
                        prescription.status === 'Ready for Pickup') && (
                        <button
                          onClick={() =>
                            updateStatus(prescription.id, 'Cancelled')
                          }
                          className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                      {(prescription.status === 'Collected' ||
                        prescription.status === 'Cancelled') && (
                        <span className="text-xs text-gray-400 italic">
                          No actions
                        </span>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {filteredPrescriptions.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No prescriptions found matching your criteria
        </div>
      )}
    </div>
  )
}
