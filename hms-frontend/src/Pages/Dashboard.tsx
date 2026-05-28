import React, { Children } from 'react'
import { motion } from 'framer-motion'
import {
  UsersIcon,
  CalendarIcon,
  BedDoubleIcon,
  DollarSignIcon,
  TrendingUpIcon,
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
const kpiData = [
  {
    label: 'Total Patients Today',
    value: '247',
    icon: UsersIcon,
    change: '+12%',
    color: 'teal',
  },
  {
    label: 'Appointments',
    value: '89',
    icon: CalendarIcon,
    change: '+8%',
    color: 'blue',
  },
  {
    label: 'Bed Occupancy',
    value: '78%',
    icon: BedDoubleIcon,
    change: '+5%',
    color: 'amber',
  },
  {
    label: 'Revenue Today',
    value: '$24.5K',
    icon: DollarSignIcon,
    change: '+15%',
    color: 'green',
  },
]
const admissionsData = [
  {
    day: 'Mon',
    patients: 45,
  },
  {
    day: 'Tue',
    patients: 52,
  },
  {
    day: 'Wed',
    patients: 48,
  },
  {
    day: 'Thu',
    patients: 61,
  },
  {
    day: 'Fri',
    patients: 55,
  },
  {
    day: 'Sat',
    patients: 38,
  },
  {
    day: 'Sun',
    patients: 42,
  },
]
const departmentData = [
  {
    department: 'Cardiology',
    patients: 45,
  },
  {
    department: 'Neurology',
    patients: 38,
  },
  {
    department: 'Pediatrics',
    patients: 52,
  },
  {
    department: 'Emergency',
    patients: 67,
  },
  {
    department: 'Orthopedics',
    patients: 41,
  },
]
const appointmentStatusData = [
  {
    name: 'Completed',
    value: 145,
    color: '#10b981',
  },
  {
    name: 'Scheduled',
    value: 89,
    color: '#3b82f6',
  },
  {
    name: 'In Progress',
    value: 34,
    color: '#f59e0b',
  },
  {
    name: 'Cancelled',
    value: 12,
    color: '#ef4444',
  },
]
const recentActivity = [
  {
    id: 1,
    action: 'New patient admitted',
    detail: 'Sarah Johnson - Cardiology',
    time: '5 min ago',
  },
  {
    id: 2,
    action: 'Appointment completed',
    detail: 'Dr. Michael Chen - Room 204',
    time: '12 min ago',
  },
  {
    id: 3,
    action: 'Medicine restocked',
    detail: 'Amoxicillin - 500 units',
    time: '23 min ago',
  },
  {
    id: 4,
    action: 'Staff check-in',
    detail: 'Dr. Emily Rodriguez - Emergency',
    time: '35 min ago',
  },
  {
    id: 5,
    action: 'Patient discharged',
    detail: 'Robert Martinez - Orthopedics',
    time: '1 hour ago',
  },
]
const container = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}
const item = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
  },
}
export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome back, here's your hospital overview
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {kpiData.map((kpi) => {
          const Icon = kpi.icon
          return (
            <motion.div
              key={kpi.label}
              variants={item}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{kpi.label}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {kpi.value}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUpIcon className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-${kpi.color}-100`}>
                  <Icon className={`w-6 h-6 text-${kpi.color}-600`} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
            delay: 0.4,
          }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Patient Admissions (Last 7 Days)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={admissionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="patients"
                stroke="#0d9488"
                strokeWidth={2}
                dot={{
                  fill: '#0d9488',
                  r: 4,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
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
            delay: 0.5,
          }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Department Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="department"
                stroke="#6b7280"
                angle={-15}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="patients" fill="#0d9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
            delay: 0.6,
          }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Appointment Status
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={appointmentStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {appointmentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {appointmentStatusData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: entry.color,
                  }}
                />
                <span className="text-sm text-gray-600">
                  {entry.name}: {entry.value}
                </span>
              </div>
            ))}
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
            delay: 0.7,
          }}
          className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.7 + index * 0.1,
                }}
                className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0"
              >
                <div className="w-2 h-2 rounded-full bg-teal-600 mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">{activity.detail}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
