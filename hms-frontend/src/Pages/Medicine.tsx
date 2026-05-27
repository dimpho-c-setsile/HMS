import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  SearchIcon,
  PillIcon,
  PlusIcon,
  ClipboardCheckIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import  StatusBadge  from '../Components/StatusBadge'
import  Modal  from '../Components/Modal'
const initialMockMedicines = [
  {
    id: 1,
    name: 'Amoxicillin',
    category: 'Antibiotics',
    stock: 450,
    unitPrice: 12.5,
    expiry: '2027-06-15',
    status: 'In Stock',
  },
  {
    id: 2,
    name: 'Ibuprofen',
    category: 'Painkillers',
    stock: 320,
    unitPrice: 8.75,
    expiry: '2027-03-20',
    status: 'In Stock',
  },
  {
    id: 3,
    name: 'Lisinopril',
    category: 'Cardiac',
    stock: 180,
    unitPrice: 15.25,
    expiry: '2026-12-10',
    status: 'In Stock',
  },
  {
    id: 4,
    name: 'Metformin',
    category: 'Diabetes',
    stock: 45,
    unitPrice: 18.5,
    expiry: '2027-01-05',
    status: 'Low Stock',
  },
  {
    id: 5,
    name: 'Vitamin D3',
    category: 'Vitamins',
    stock: 520,
    unitPrice: 6.25,
    expiry: '2027-09-30',
    status: 'In Stock',
  },
  {
    id: 6,
    name: 'Aspirin',
    category: 'Painkillers',
    stock: 0,
    unitPrice: 5.5,
    expiry: '2026-11-15',
    status: 'Out of Stock',
  },
  {
    id: 7,
    name: 'Omeprazole',
    category: 'Gastric',
    stock: 280,
    unitPrice: 14.75,
    expiry: '2027-04-22',
    status: 'In Stock',
  },
  {
    id: 8,
    name: 'Atorvastatin',
    category: 'Cardiac',
    stock: 35,
    unitPrice: 22.0,
    expiry: '2026-10-08',
    status: 'Low Stock',
  },
  {
    id: 9,
    name: 'Azithromycin',
    category: 'Antibiotics',
    stock: 195,
    unitPrice: 16.5,
    expiry: '2027-07-12',
    status: 'In Stock',
  },
  {
    id: 10,
    name: 'Paracetamol',
    category: 'Painkillers',
    stock: 410,
    unitPrice: 4.25,
    expiry: '2027-05-18',
    status: 'In Stock',
  },
  {
    id: 11,
    name: 'Insulin Glargine',
    category: 'Diabetes',
    stock: 125,
    unitPrice: 45.0,
    expiry: '2026-12-30',
    status: 'In Stock',
  },
  {
    id: 12,
    name: 'Vitamin B Complex',
    category: 'Vitamins',
    stock: 340,
    unitPrice: 7.5,
    expiry: '2027-08-25',
    status: 'In Stock',
  },
]
const categories = [
  'All',
  'Antibiotics',
  'Painkillers',
  'Cardiac',
  'Diabetes',
  'Vitamins',
  'Gastric',
]
export default function Medicine() {
  const [medicines, setMedicines] = useState(initialMockMedicines)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Antibiotics',
    stock: '',
    unitPrice: '',
    expiry: '',
    status: 'In Stock',
  })
  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch = medicine.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory =
      categoryFilter === 'All' || medicine.category === categoryFilter
    return matchesSearch && matchesCategory
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newMedicine = {
      id: Math.max(...medicines.map((m) => m.id)) + 1,
      name: formData.name,
      category: formData.category,
      stock: parseInt(formData.stock),
      unitPrice: parseFloat(formData.unitPrice),
      expiry: formData.expiry,
      status: formData.status,
    }
    setMedicines([newMedicine, ...medicines])
    setIsModalOpen(false)
    setFormData({
      name: '',
      category: 'Antibiotics',
      stock: '',
      unitPrice: '',
      expiry: '',
      status: 'In Stock',
    })
  }
  return (
    <div className="p-8 ml-64">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Medicine Collection
          </h1>
          <p className="text-gray-500 mt-1">
            Manage pharmacy inventory and stock levels
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/prescriptions"
            className="flex items-center gap-2 px-4 py-2 bg-white text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
          >
            <ClipboardCheckIcon className="w-5 h-5" />
            <span>Prescriptions</span>
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Medicine</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${categoryFilter === category ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {category}
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
                  Medicine Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Stock Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Unit Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMedicines.map((medicine, index) => (
                <motion.tr
                  key={medicine.id}
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
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                        <PillIcon className="w-4 h-4 text-teal-600" />
                      </div>
                      <span className="font-medium text-gray-900">
                        {medicine.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {medicine.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {medicine.stock} units
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${medicine.unitPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {medicine.expiry}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={medicine.status} variant="stock" />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {filteredMedicines.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No medicines found matching your criteria
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Medicine"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medicine Name
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
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              >
                {categories
                  .filter((c) => c !== 'All')
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stock: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit Price ($)
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.unitPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    unitPrice: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                required
                value={formData.expiry}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    expiry: e.target.value,
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
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
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
              Save Medicine
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
