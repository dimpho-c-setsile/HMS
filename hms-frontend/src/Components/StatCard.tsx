import React from "react";
import { motion } from "framer-motion";
import { BoxIcon } from "lucide-react";
type Tone = 'teal' | 'blue' | 'amber' | 'green' | 'red';
const tones: Record<Tone, {
  bg: string;
  fg: string;
}> = {
  teal: {
    bg: 'bg-teal-100',
    fg: 'text-teal-700'
  },
  blue: {
    bg: 'bg-blue-100',
    fg: 'text-blue-700'
  },
  amber: {
    bg: 'bg-amber-100',
    fg: 'text-amber-700'
  },
  green: {
    bg: 'bg-green-100',
    fg: 'text-green-700'
  },
  red: {
    bg: 'bg-red-100',
    fg: 'text-red-700'
  }
};
type StatCardProps = {
  label: string;
  value: string | number;
  icon: BoxIcon;
  tone?: Tone;
  hint?: string;
  index?: number;
};
export default function StatCard({
  label,
  value,
  icon: Icon,
  tone = 'teal',
  hint,
  index = 0
}: StatCardProps) {
  const palette = tones[tone];
  return <motion.div initial={{
    opacity: 0,
    y: 12
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.25,
    delay: index * 0.05,
    ease: [0.23, 1, 0.32, 1]
  }} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        {hint && <p className="text-xs text-gray-400 mt-2">{hint}</p>}
      </div>
      <div className={`p-3 rounded-lg shrink-0 ${palette.bg}`}>
        <Icon className={`w-6 h-6 ${palette.fg}`} />
      </div>
    </motion.div>;
}