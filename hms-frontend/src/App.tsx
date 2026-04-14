import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './pages/Dashboard'
import { Patients } from './pages/Patients'
import { Staff } from './pages/Staff'
import { Appointments } from './pages/Appointments'
import { Medicine } from './pages/Medicine'
import { Queue } from './pages/Queue'
import { Prescriptions } from './pages/Prescriptions'
import { Login } from './pages/Login'
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />
  }
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar onLogout={() => setIsAuthenticated(false)} />
        <main className="flex-1 ml-64">
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
        </main>
      </div>
    </BrowserRouter>
  )
}