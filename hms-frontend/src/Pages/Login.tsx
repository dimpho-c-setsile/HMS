import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ActivityIcon, LockIcon, MailIcon } from 'lucide-react'
import { accounts, useAuth } from '../contexts/AuthContext'

/*
const quickAccess = [
  { label: 'Admin', email: 'admin@medicare.com', password: 'admin123' },
  {
    label: 'Reception',
    email: 'reception@medicare.com',
    password: 'reception123',
  },
  { label: 'Doctor', email: 'doctor@medicare.com', password: 'doctor123' },
  {
    label: 'Pharmacy',
    email: 'pharmacy@medicare.com',
    password: 'pharmacy123',
  },
]*/

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const success = login(email, password)
    if (!success) {
      setError('Invalid email or password. Please try again.')
    }
  }



  return (
    <div className="min-h-screen bg-teal-50 flex flex-col justify-center py-12 px-4 sm:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="flex justify-center"
        >
          <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
            <ActivityIcon className="w-9 h-9 text-white" />
          </div>
        </motion.div>
        <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          MediCare System
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your hospital workspace
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-6 shadow-xl shadow-teal-900/5 rounded-xl border border-teal-100">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div
                role="alert"
                className="bg-red-50 text-red-700 p-3 rounded-lg text-sm font-medium border border-red-100"
              >
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                  placeholder="you@medicare.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Demo workspaces
            </p>
            {/*
            <div className="grid grid-cols-2 gap-2">
              {quickAccess.map((account) => (
                <button
                  key={account.label}
                  type="button"
                  onClick={() => fill(account)}
                  className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:border-teal-400 hover:text-teal-700 transition-colors"
                >
                  {account.label}
                </button>
              ))}
            </div>*/}
            <p className="mt-3 text-xs text-gray-400">
              {accounts.length} roles available. Select one to autofill
              credentials.
            </p>
            <p  className="mt-3 text-xs text-gray-400">Administatrion: admin@medicare.com   password: admin123<br/>
               Reception: reception@medicare.com  password : reception123 <br/>
               Doctor : doctor@medicare.com password : doctor123 <br/>
               Pharmacy : pharmacy@medicare.com password : pharmacy123
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
