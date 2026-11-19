import { Pill, PackageCheck, AlertTriangle, Clock3 } from 'lucide-react';
import Sidebar from '../Components/Sidebar';
import StatCard from '../Components/StatCard';
import StatusBadge from '../Components/StatusBadge';



// Replace with real data fetched from Supabase
const stats = {
  medicinesInStock: 128,
  collectedToday: 17,
  lowStock: 4,
  pendingCollections: 6,
};

interface PendingCollection {
  patient: string;
  medicine: string;
  status: string;
}

const pendingList: PendingCollection[] = [
  { patient: 'T. Mokoena', medicine: 'Amoxicillin 500mg', status: 'queued' },
  { patient: 'S. van Wyk', medicine: 'Paracetamol syrup', status: 'queued' },
  { patient: 'L. Ndlovu', medicine: 'Ibuprofen 400mg', status: 'waiting' },
];



export default function PharmacyDashboard() {
  return (
    <div className="flex min-h-screen bg-canvas font-sans text-ink">
      <Sidebar />

      <main className="flex-1 px-8 py-8">
        <header className="mb-8">
          <h1 className="font-display text-2xl font-medium text-ink">Pharmacy dashboard</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {new Date().toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Medicines in stock" value={stats.medicinesInStock} icon={Pill} />
          <StatCard label="Collected today" value={stats.collectedToday} icon={PackageCheck} />
          <StatCard label="Low stock items" value={stats.lowStock} icon={AlertTriangle} />
          <StatCard label="Pending collections" value={stats.pendingCollections} icon={Clock3} />
        </div>

        <section className="mt-8 rounded-lg border border-line bg-surface">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-display text-base font-medium text-ink">Pending collections</h2>
            <a href="/pharmacy/collection" className="text-sm text-teal-700 hover:underline">
              Open medicine collection
            </a>
          </div>
          <ul className="divide-y divide-line">
            {pendingList.map((p) => (
              <li key={p.patient} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <p className="text-sm font-medium text-ink">{p.patient}</p>
                  <p className="text-xs text-ink-soft">{p.medicine}</p>
                </div>
                <StatusBadge status={p.status} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
