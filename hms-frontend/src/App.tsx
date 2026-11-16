import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import  Sidebar  from './Components/Sidebar'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { HospitalProvider } from './contexts/HospitalContext'
import  Login  from './pages/Login'
import  Dashboard  from './pages/Dashboard'
import  ReceptionDashboard  from './pages/ReceptionDashboard'
import  DoctorDashboard  from './pages/DoctorDashboard'
import  Patients  from './pages/Patients'
import  Staff  from './pages/Staff'
import  Appointments  from './pages/Appointments'
import  DoctorAppointments  from './pages/DoctorAppointments'
import  Medicine  from './pages/Medicine'
import  Prescriptions  from './pages/Prescriptions'
import  PatientHistory  from './pages/PatientHistory'
import  Queue  from './pages/Queue'

function RoleRoutes() {
  const { user } = useAuth()
  if (!user) return null

  if (user.role === 'admin') {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  if (user.role === 'reception') {
    return (
      <Routes>
        <Route path="/" element={<ReceptionDashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  if (user.role === 'doctor') {
    return (
      <Routes>
        <Route path="/" element={<DoctorDashboard />} />
        <Route path="/appointments" element={<DoctorAppointments />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/history" element={<PatientHistory />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Medicine />} />
      <Route path="/prescriptions" element={<Prescriptions />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function Workspace() {
  const { user } = useAuth()

  if (!user) return <Login />

  return (<>
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 ml-64">
          <RoleRoutes />
        </main>
      </div>
    </BrowserRouter>
 </> 
  )
}

export default function App() {
  return (
    <AuthProvider>
      <HospitalProvider>
        <Workspace />
      </HospitalProvider>
    </AuthProvider>
  )
}
