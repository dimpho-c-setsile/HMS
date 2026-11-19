
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import  Sidebar  from './Components/Sidebar'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { HospitalProvider } from './contexts/HospitalContext'
import  Login  from './Pages/Login'
import  Dashboard  from './Pages/Dashboard'
import  ReceptionDashboard  from './Pages/ReceptionDashboard'
import  DoctorDashboard  from './Pages/DoctorDashboard'
import  Patients  from './Pages/Patients'
import  Staff  from './Pages/Staff'
import  Appointments  from './Pages/Appointments'
import  DoctorAppointments  from './Pages/DoctorAppointments'
import  Medicine  from './Pages/Medicine'
import  Prescriptions  from './Pages/Prescriptions'
import  PatientHistory  from './Pages/PatientHistory'
import  Queue  from './Pages/Queue'

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
