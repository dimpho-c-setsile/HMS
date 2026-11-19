'use client';

import { useState, type FormEvent } from 'react';
import { Plus, X, FileText } from 'lucide-react';
import Sidebar from '../Components/Sidebar';

interface PrescriptionRecord {
  id: number;
  patient: string;
  date: string;
  diagnosis: string;
  medicine: string;
}

// Replace with real data fetched from Supabase, scoped to the signed-in doctor
const initialHistory: PrescriptionRecord[] = [
  {
    id: 1,
    patient: 'B. Khumalo',
    date: '2026-08-05',
    diagnosis: 'Acute sinusitis',
    medicine: 'Amoxicillin 500mg, 3x daily for 7 days',
  },
  {
    id: 2,
    patient: 'A. Steyn',
    date: '2026-07-28',
    diagnosis: 'Tension headache',
    medicine: 'Paracetamol 500mg as needed',
  },
];

interface PrescriptionForm {
  patient: string;
  diagnosis: string;
  medicine: string;
}

const emptyForm: PrescriptionForm = { patient: '', diagnosis: '', medicine: '' };



export default function DoctorPrescriptions() {
  const [history, setHistory] = useState<PrescriptionRecord[]>(initialHistory);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<PrescriptionForm>(emptyForm);
  const [activePatient, setActivePatient] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.patient || !form.diagnosis || !form.medicine) return;

    setHistory((prev) => [
      { id: Date.now(), date: new Date().toISOString().slice(0, 10), ...form },
      ...prev,
    ]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const visiblePatients = [...new Set(history.map((h) => h.patient))];
  const filteredHistory = activePatient ? history.filter((h) => h.patient === activePatient) : history;

  return (
    <div className="flex min-h-screen bg-canvas font-sans text-ink">
      <Sidebar  />

      <main className="flex-1 px-8 py-8">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-medium text-ink">Prescriptions</h1>
            <p className="mt-1 text-sm text-ink-soft">Diagnoses and prescriptions you&apos;ve written</p>
          </div>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 rounded-md bg-teal-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700"
          >
            {showForm ? <X size={16} /> : <Plus size={16} />}
            {showForm ? 'Cancel' : 'New prescription'}
          </button>
        </header>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 rounded-lg border border-line bg-surface p-5">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-ink-soft">Patient</label>
                <input
                  value={form.patient}
                  onChange={(e) => setForm({ ...form, patient: e.target.value })}
                  placeholder="Patient name"
                  className="w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-ink-soft">Diagnosis</label>
                <input
                  value={form.diagnosis}
                  onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
                  placeholder="e.g. Acute sinusitis"
                  className="w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-ink-soft">Prescription</label>
                <textarea
                  value={form.medicine}
                  onChange={(e) => setForm({ ...form, medicine: e.target.value })}
                  placeholder="Medicine, dosage, frequency, duration"
                  rows={3}
                  className="w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/90"
            >
              Save prescription
            </button>
          </form>
        )}

        <div className="grid grid-cols-4 gap-6">
          <aside className="rounded-lg border border-line bg-surface p-4">
            <p className="mb-2 text-xs font-medium text-ink-soft">Patient history</p>
            <button
              onClick={() => setActivePatient(null)}
              className={`mb-1 block w-full rounded-md px-3 py-2 text-left text-sm ${
                !activePatient ? 'bg-teal-50 text-teal-700 font-medium' : 'text-ink hover:bg-canvas'
              }`}
            >
              All patients
            </button>
            {visiblePatients.map((p) => (
              <button
                key={p}
                onClick={() => setActivePatient(p)}
                className={`block w-full rounded-md px-3 py-2 text-left text-sm ${
                  activePatient === p ? 'bg-teal-50 text-teal-700 font-medium' : 'text-ink hover:bg-canvas'
                }`}
              >
                {p}
              </button>
            ))}
          </aside>

          <section className="col-span-3 rounded-lg border border-line bg-surface">
            <ul className="divide-y divide-line">
              {filteredHistory.map((h) => (
                <li key={h.id} className="px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-teal-500" />
                      <p className="text-sm font-medium text-ink">{h.patient}</p>
                    </div>
                    <span className="text-xs text-ink-soft">{h.date}</span>
                  </div>
                  <p className="mt-2 text-sm text-ink">
                    <span className="text-ink-soft">Diagnosis: </span>
                    {h.diagnosis}
                  </p>
                  <p className="mt-1 text-sm text-ink">
                    <span className="text-ink-soft">Prescription: </span>
                    {h.medicine}
                  </p>
                </li>
              ))}
              {filteredHistory.length === 0 && (
                <li className="px-5 py-8 text-center text-sm text-ink-soft">No prescriptions yet.</li>
              )}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
