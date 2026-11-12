import React, { createContext, useContext, useState } from 'react'
import type { User } from '../types/hospital'

type Account = User & {
  email: string
  password: string
}

export const accounts: Account[] = [
  {
    id: 1,
    name: 'Alice Dube',
    title: 'System Administrator',
    role: 'admin',
    initials: 'AD',
    email: 'admin@medicare.com',
    password: 'admin123',
  },
  {
    id: 2,
    name: 'Rachel Adams',
    title: 'Reception Desk',
    role: 'reception',
    initials: 'RA',
    email: 'reception@medicare.com',
    password: 'reception123',
  },
  {
    id: 3,
    name: 'Dr. Michael Chen',
    title: 'Consultant, Cardiology',
    role: 'doctor',
    department: 'Cardiology',
    initials: 'MC',
    email: 'doctor@medicare.com',
    password: 'doctor123',
  },
  {
    id: 4,
    name: 'Daniel Okoye',
    title: 'Lead Pharmacist',
    role: 'pharmacy',
    department: 'Pharmacy',
    initials: 'DO',
    email: 'pharmacy@medicare.com',
    password: 'pharmacy123',
  },
]

type AuthContextValue = {
  user: User | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (email: string, password: string) => {
    const match = accounts.find(
      (account) =>
        account.email.toLowerCase() === email.trim().toLowerCase() &&
        account.password === password,
    )
    if (!match) return false
    const { email: _email, password: _password, ...profile } = match
    setUser(profile)
    return true
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
