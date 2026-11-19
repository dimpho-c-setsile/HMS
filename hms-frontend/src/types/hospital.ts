export type Role = 'admin' | 'reception' | 'doctor' | 'pharmacy'

export type User = {
  id: number
  name: string
  title: string
  role: Role
  department?: string
  initials: string
}

export type PatientStatus =
  | 'Admitted'
  | 'Outpatient'
  | 'Discharged'
  | 'Critical'

export type Patient = {
  id: number
  name: string
  age: number
  gender: string
  contact: string
  condition: string
  status: PatientStatus
  admissionDate: string
}

export type StaffMember = {
  id: number
  name: string
  role: 'Doctor' | 'Nurse' | 'Admin' | 'Technician' | 'Pharmacist'
  department: string
  contact: string
  email: string
  availability: string
}

export type AppointmentStatus =
  | 'Scheduled'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled'

export type Appointment = {
  id: number
  patientName: string
  doctor: string
  department: string
  time: string
  date: string
  status: AppointmentStatus
  reason: string
  diagnosis?: string
}

export type Medicine = {
  id: number
  name: string
  category: string
  stock: number
  unitPrice: number
  expiry: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

export type PrescriptionStatus =
  | 'Pending'
  | 'Ready for Pickup'
  | 'Collected'
  | 'Cancelled'

export type Prescription = {
  id: number
  patientName: string
  medicine: string
  dosage: string
  diagnosis: string
  notes: string
  prescribedBy: string
  department: string
  dateIssued: string
  status: PrescriptionStatus
}

export type QueueEntry = {
  id: number
  patientName: string
  token: string
  priority: 'Normal' | 'Urgent' | 'Emergency'
  department: string
  waitTime: string
  status: 'Waiting' | 'In Consultation' | 'Completed'
}

export const DEPARTMENTS = [
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Emergency',
  'Orthopedics',
]
