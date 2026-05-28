import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { UserIcon, PhoneIcon, MailIcon, PlusIcon } from 'lucide-react'
import  Modal from '../Components/Modal'

const initialMockStaff = [
  {
    id: 1,
    name: 'Dr. Michael Chen',
    role: 'Doctor',
    department: 'Cardiology',
    contact: '(555) 111-2222',
    email: 'mchen@medicare.com',
    availability: 'Available',
  },
  {
    id: 2,
    name: 'Dr. Emily Rodriguez',
    role: 'Doctor',
    department: 'Neurology',
    contact: '(555) 222-3333',
    email: 'erodriguez@medicare.com',
    availability: 'In Surgery',
  },
  {
    id: 3,
    name: 'Nurse Sarah Williams',
    role: 'Nurse',
    department: 'Emergency',
    contact: '(555) 333-4444',
    email: 'swilliams@medicare.com',
    availability: 'Available',
  },
  {
    id: 4,
    name: 'Dr. James Anderson',
    role: 'Doctor',
    department: 'Pediatrics',
    contact: '(555) 444-5555',
    email: 'janderson@medicare.com',
    availability: 'Available',
  },
  {
    id: 5,
    name: 'Nurse Lisa Thompson',
    role: 'Nurse',
    department: 'Cardiology',
    contact: '(555) 555-6666',
    email: 'lthompson@medicare.com',
    availability: 'On Break',
  },
  {
    id: 6,
    name: 'Dr. Robert Martinez',
    role: 'Doctor',
    department: 'Orthopedics',
    contact: '(555) 666-7777',
    email: 'rmartinez@medicare.com',
    availability: 'Available',
  },
  {
    id: 7,
    name: 'Admin Jennifer Lee',
    role: 'Admin',
    department: 'Administration',
    contact: '(555) 777-8888',
    email: 'jlee@medicare.com',
    availability: 'Available',
  },
  {
    id: 8,
    name: 'Tech David Wilson',
    role: 'Technician',
    department: 'Radiology',
    contact: '(555) 888-9999',
    email: 'dwilson@medicare.com',
    availability: 'Available',
  },
  {
    id: 9,
    name: 'Nurse Maria Garcia',
    role: 'Nurse',
    department: 'Pediatrics',
    contact: '(555) 999-0000',
    email: 'mgarcia@medicare.com',
    availability: 'Available',
  },
  {
    id: 10,
    name: 'Dr. Christopher Brown',
    role: 'Doctor',
    department: 'Emergency',
    contact: '(555) 000-1111',
    email: 'cbrown@medicare.com',
    availability: 'In Consultation',
  },
]
const departments = [
  'All',
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Emergency',
  'Orthopedics',
  'Administration',
  'Radiology',
]
const roles = ['All', 'Doctor', 'Nurse', 'Admin', 'Technician']
export default function Staff() {
  const [staffList, setStaffList] = useState(initialMockStaff)
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [roleFilter, setRoleFilter] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    role: 'Doctor',
    department: 'Cardiology',
    contact: '',
    email: '',
    availability: 'Available',
  })
  const filteredStaff = staffList.filter((staff) => {
    const matchesDepartment =
      departmentFilter === 'All' || staff.department === departmentFilter
    const matchesRole = roleFilter === 'All' || staff.role === roleFilter
    return matchesDepartment && matchesRole
  })
  const getAvailabilityColor = (availability: string) => {
    if (availability === 'Available') return 'bg-green-100 text-green-700'
    if (availability === 'On Break') return 'bg-amber-100 text-amber-700'
    return 'bg-red-100 text-red-700'
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newStaff = {
      id: Math.max(...staffList.map((s) => s.id)) + 1,
      ...formData,
    }
    setStaffList([newStaff, ...staffList])
    setIsModalOpen(false)
    setFormData({
      name: '',
      role: 'Doctor',
      department: 'Cardiology',
      contact: '',
      email: '',
      availability: 'Available',
    })
  }
  return (
    <div className="p-8 ml-64">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff</h1>
          <p className="text-gray-500 mt-1">
            Manage hospital staff and view availability
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Staff Member</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredStaff.map((staff, index) => (
          <motion.div
            key={staff.id}
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
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-teal-600" />
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(staff.availability)}`}
              >
                {staff.availability}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {staff.name}
            </h3>
            <p className="text-sm text-teal-600 font-medium mb-1">
              {staff.role}
            </p>
            <p className="text-sm text-gray-500 mb-4">{staff.department}</p>

            <div className="space-y-2 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <PhoneIcon className="w-4 h-4" />
                <span>{staff.contact}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MailIcon className="w-4 h-4" />
                <span className="truncate">{staff.email}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredStaff.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No staff members found matching your criteria
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Staff Member"
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
                placeholder="e.g. Dr. Jane Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              >
                {roles
                  .filter((r) => r !== 'All')
                  .map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
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
                {departments
                  .filter((d) => d !== 'All')
                  .map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
              </select>
            </div>
            <div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              <select
                value={formData.availability}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availability: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="Available">Available</option>
                <option value="On Break">On Break</option>
                <option value="In Surgery">In Surgery</option>
                <option value="In Consultation">In Consultation</option>
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
              Save Staff Member
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
