
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboardIcon,
  UsersIcon,
  UserCogIcon,
  CalendarIcon,
  PillIcon,
  ClipboardListIcon,
  ClipboardCheckIcon,
} from 'lucide-react'

const navItems = [
  {
    path: '/',
    label: 'Dashboard',
    icon: LayoutDashboardIcon,
  },
  {
    path: '/patients',
    label: 'Patients',
    icon: UsersIcon,
  },
  {
    path: '/staff',
    label: 'Staff',
    icon: UserCogIcon,
  },
  {
    path: '/appointments',
    label: 'Appointments',
    icon: CalendarIcon,
  },
  {
    path: '/medicine',
    label: 'Medicine',
    icon: PillIcon,
  },
  {
    path: '/prescriptions',
    label: 'Prescriptions',
    icon: ClipboardCheckIcon,
  },
  {
    path: '/queue',
    label: 'Queue',
    icon: ClipboardListIcon,
  },
]

export default function Sidebar() {
    const location = useLocation()
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-teal-600">MediCare</h1>
        <p className="text-sm text-gray-500 mt-1">Hospital Management</p>
      </div>

           
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          return (
            <Link key={item.path} to={item.path}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {isActive && (
                  <div
                  
                    className="absolute left-0 top-0 bottom-0 w-1 bg-teal-600 rounded-r"
                
                    
                  />
                )}
                
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>
          
        </div>
      
    
  )
}
