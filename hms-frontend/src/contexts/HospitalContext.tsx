import React, { createContext, useContext, useMemo, useState } from 'react'
import type {
  Appointment,
  AppointmentStatus,
  Medicine,
  Patient,
  Prescription,
  PrescriptionStatus,
  QueueEntry,
  StaffMember,
} from '../types/hospital'
import { seedPatients } from '../data/patients'
import { seedStaff } from '../data/staff'
import { seedAppointments } from '../data/appointments'
import { seedMedicines } from '../data/medicines'
import { seedPrescriptions } from '../data/prescriptions'
import { seedQueue } from '../data/queue'

type HospitalContextValue = {
  patients: Patient[]
  staff: StaffMember[]
  appointments: Appointment[]
  medicines: Medicine[]
  prescriptions: Prescription[]
  queue: QueueEntry[]
  doctors: StaffMember[]
  addPatient: (patient: Omit<Patient, 'id'>) => void
  addStaff: (member: Omit<StaffMember, 'id'>) => void
  addAppointment: (appointment: Omit<Appointment, 'id' | 'doctor'> & { doctor: string }) => void
  updateAppointment: (id: number, changes: Partial<Appointment>) => void
  setAppointmentStatus: (id: number, status: AppointmentStatus) => void
  addMedicine: (medicine: Omit<Medicine, 'id'>) => void
  addPrescription: (prescription: Omit<Prescription, 'id'>) => void
  setPrescriptionStatus: (id: number, status: PrescriptionStatus) => void
  addQueueEntry: (entry: Omit<QueueEntry, 'id' | 'token' | 'waitTime' | 'status'>) => void
  setQueueStatus: (id: number, status: QueueEntry['status']) => void
  resolveDoctor: (department: string, requested: string) => string
}

const HospitalContext = createContext<HospitalContextValue | undefined>(undefined)

const nextId = (items: { id: number }[]) =>
  items.length === 0 ? 1 : Math.max(...items.map((item) => item.id)) + 1

export function HospitalProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(seedPatients)
  const [staff, setStaff] = useState<StaffMember[]>(seedStaff)
  const [appointments, setAppointments] = useState<Appointment[]>(seedAppointments)
  const [medicines, setMedicines] = useState<Medicine[]>(seedMedicines)
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(seedPrescriptions)
  const [queue, setQueue] = useState<QueueEntry[]>(seedQueue)

  const doctors = useMemo(
    () => staff.filter((member) => member.role === 'Doctor'),
    [staff],
  )

  const resolveDoctor = (department: string, requested: string) => {
    if (requested && requested !== 'auto') return requested
    const inDepartment = doctors.filter(
      (doctor) => doctor.department === department,
    )
    const available = inDepartment.find(
      (doctor) => doctor.availability === 'Available',
    )
    return available?.name ?? inDepartment[0]?.name ?? 'Unassigned'
  }

  const addPatient: HospitalContextValue['addPatient'] = (patient) => {
    setPatients((prev) => [{ ...patient, id: nextId(prev) }, ...prev])
  }

  const addStaff: HospitalContextValue['addStaff'] = (member) => {
    setStaff((prev) => [{ ...member, id: nextId(prev) }, ...prev])
  }

  const addAppointment: HospitalContextValue['addAppointment'] = (appointment) => {
    const doctor = resolveDoctor(appointment.department, appointment.doctor)
    setAppointments((prev) => [
      { ...appointment, doctor, id: nextId(prev) },
      ...prev,
    ])
  }

  const updateAppointment: HospitalContextValue['updateAppointment'] = (
    id,
    changes,
  ) => {
    setAppointments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...changes } : item)),
    )
  }

  const setAppointmentStatus: HospitalContextValue['setAppointmentStatus'] = (
    id,
    status,
  ) => updateAppointment(id, { status })

  const addMedicine: HospitalContextValue['addMedicine'] = (medicine) => {
    setMedicines((prev) => [{ ...medicine, id: nextId(prev) }, ...prev])
  }

  const addPrescription: HospitalContextValue['addPrescription'] = (
    prescription,
  ) => {
    setPrescriptions((prev) => [{ ...prescription, id: nextId(prev) }, ...prev])
  }

  const setPrescriptionStatus: HospitalContextValue['setPrescriptionStatus'] = (
    id,
    status,
  ) => {
    const dispensed = prescriptions.find((item) => item.id === id)
    setPrescriptions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    )
    if (status === 'Collected' && dispensed) {
      setMedicines((stock) =>
        stock.map((medicine) =>
          medicine.name === dispensed.medicine && medicine.stock > 0
            ? { ...medicine, stock: medicine.stock - 1 }
            : medicine,
        ),
      )
    }
  }

  const addQueueEntry: HospitalContextValue['addQueueEntry'] = (entry) => {
    setQueue((prev) => {
      const lastNumber = prev.reduce((highest, item) => {
        const parsed = parseInt(item.token.split('-')[1], 10)
        return Number.isNaN(parsed) ? highest : Math.max(highest, parsed)
      }, 100)
      return [
        {
          ...entry,
          id: nextId(prev),
          token: `A-${lastNumber + 1}`,
          waitTime: '0 min',
          status: 'Waiting',
        },
        ...prev,
      ]
    })
  }

  const setQueueStatus: HospitalContextValue['setQueueStatus'] = (id, status) => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    )
  }

  return (
    <HospitalContext.Provider
      value={{
        patients,
        staff,
        appointments,
        medicines,
        prescriptions,
        queue,
        doctors,
        addPatient,
        addStaff,
        addAppointment,
        updateAppointment,
        setAppointmentStatus,
        addMedicine,
        addPrescription,
        setPrescriptionStatus,
        addQueueEntry,
        setQueueStatus,
        resolveDoctor,
      }}
    >
      {children}
    </HospitalContext.Provider>
  )
}

export function useHospital() {
  const context = useContext(HospitalContext)
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider')
  }
  return context
}
