
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboardIcon, UsersIcon, UserCogIcon, CalendarIcon, PillIcon, ClipboardListIcon, ClipboardCheckIcon, FileTextIcon, LogOutIcon, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import type { Role } from "../types/hospital";
type NavItem = {
  path: string;
  label: string;
  icon: LucideIcon;
};
export const navByRole: Record<Role, NavItem[]> = {
  admin: [{
    path: '/',
    label: 'Dashboard',
    icon: LayoutDashboardIcon
  }, {
    path: '/patients',
    label: 'Patients',
    icon: UsersIcon
  }, {
    path: '/staff',
    label: 'Staff',
    icon: UserCogIcon
  }, {
    path: '/appointments',
    label: 'Appointments',
    icon: CalendarIcon
  }, {
    path: '/medicine',
    label: 'Medicine',
    icon: PillIcon
  }, {
    path: '/prescriptions',
    label: 'Prescriptions',
    icon: ClipboardCheckIcon
  }, {
    path: '/queue',
    label: 'Queue',
    icon: ClipboardListIcon
  }],
  reception: [{
    path: '/',
    label: 'Dashboard',
    icon: LayoutDashboardIcon
  }, {
    path: '/patients',
    label: 'Patients',
    icon: UsersIcon
  }, {
    path: '/appointments',
    label: 'Appointments',
    icon: CalendarIcon
  }, {
    path: '/queue',
    label: 'Queue',
    icon: ClipboardListIcon
  }],
  doctor: [{
    path: '/',
    label: 'Dashboard',
    icon: LayoutDashboardIcon
  }, {
    path: '/appointments',
    label: 'My Appointments',
    icon: CalendarIcon
  }, {
    path: '/prescriptions',
    label: 'Prescriptions',
    icon: ClipboardCheckIcon
  }, {
    path: '/history',
    label: 'Patient History',
    icon: FileTextIcon
  }],
  pharmacy: [{
    path: '/',
    label: 'Medicine Stock',
    icon: PillIcon
  }, {
    path: '/prescriptions',
    label: 'Collections',
    icon: ClipboardCheckIcon
  }]
};
const roleLabels: Record<Role, string> = {
  admin: 'Administration',
  reception: 'Reception',
  doctor: 'Doctor Portal',
  pharmacy: 'Pharmacy'
};
export default function Sidebar() {
  const location = useLocation();
  const {
    user,
    logout
  } = useAuth();
  if (!user) return null;
  const navItems = navByRole[user.role];
  return <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-teal-600">MediCare</h1>
        <p className="text-sm text-gray-500 mt-1">{roleLabels[user.role]}</p>
      </div>

      <nav className="flex-1 p-4 space-y-1" aria-label="Main navigation">
        {navItems.map(item => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        return <Link key={item.path} to={item.path}>
              <motion.div whileHover={{
            x: 4
          }} transition={{
            duration: 0.15,
            ease: [0.23, 1, 0.32, 1]
          }} className={`flex items-center gap-3 px-4 py-3 rounded-lg relative ${isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                {isActive && <motion.div layoutId="activeIndicator" className="absolute left-0 top-0 bottom-0 w-1 bg-teal-600 rounded-r" transition={{
              type: 'spring',
              stiffness: 400,
              damping: 32
            }} />}
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>;
      })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 shrink-0 rounded-full bg-teal-100 flex items-center justify-center">
              <span className="text-teal-700 font-semibold">
                {user.initials}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.title}</p>
            </div>
          </div>
          <button onClick={logout} className="p-2 shrink-0 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Log out" aria-label="Log out">
            <LogOutIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>;
}
