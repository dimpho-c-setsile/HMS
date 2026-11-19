import  { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SearchIcon, ChevronDownIcon } from 'lucide-react'
import  StatusBadge  from '../Components/StatusBadge'
import { useHospital } from '../contexts/HospitalContext'
import { formatShortDate } from '../utils/date'

export default function PatientHistory() {
  const { patients, appointments, prescriptions } = useHospital()
  const [searchQuery, setSearchQuery] = useState('')
  const [expanded, setExpanded] = useState<number | null>(null)

  const visible = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Patient History</h1>
        <p className="text-gray-500 mt-1">
          Past diagnoses and prescriptions for every patient on record
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by patient name or condition..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="space-y-3">
        {visible.map((patient, index) => {
          const history = appointments
            .filter(
              (appointment) =>
                appointment.patientName === patient.name &&
                appointment.diagnosis,
            )
            .sort((a, b) => b.date.localeCompare(a.date))
          const scripts = prescriptions
            .filter(
              (prescription) => prescription.patientName === patient.name,
            )
            .sort((a, b) => b.dateIssued.localeCompare(a.dateIssued))
          const isOpen = expanded === patient.id

          return (
            <motion.article
              key={patient.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: Math.min(index * 0.03, 0.24),
              }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setExpanded(isOpen ? null : patient.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 font-semibold flex items-center justify-center shrink-0">
                  {patient.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 truncate">
                    {patient.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {patient.age} yrs · {patient.gender} · {patient.condition}
                  </p>
                </div>
                <span className="hidden sm:block text-sm text-gray-500 shrink-0">
                  {history.length} visit{history.length === 1 ? '' : 's'} ·{' '}
                  {scripts.length} script{scripts.length === 1 ? '' : 's'}
                </span>
                <StatusBadge status={patient.status} variant="patient" />
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.22,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="overflow-hidden border-t border-gray-100"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                      <section>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                          Diagnoses
                        </h3>
                        {history.length === 0 ? (
                          <p className="text-sm text-gray-500">
                            No recorded diagnoses yet.
                          </p>
                        ) : (
                          <ul className="space-y-3">
                            {history.map((visit) => (
                              <li
                                key={visit.id}
                                className="border-l-2 border-teal-500 pl-3"
                              >
                                <p className="text-sm text-gray-900">
                                  {visit.diagnosis}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {formatShortDate(visit.date)} ·{' '}
                                  {visit.doctor}
                                </p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </section>

                      <section>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                          Prescriptions
                        </h3>
                        {scripts.length === 0 ? (
                          <p className="text-sm text-gray-500">
                            No prescriptions on file.
                          </p>
                        ) : (
                          <ul className="space-y-3">
                            {scripts.map((script) => (
                              <li
                                key={script.id}
                                className="border-l-2 border-blue-500 pl-3"
                              >
                                <p className="text-sm font-medium text-gray-900">
                                  {script.medicine}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {script.dosage}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {formatShortDate(script.dateIssued)} ·{' '}
                                  {script.status}
                                </p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </section>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          )
        })}
      </div>

      {visible.length === 0 && (
        <p className="text-center py-12 text-gray-500">
          No patients match your search.
        </p>
      )}
    </div>
  )
}
