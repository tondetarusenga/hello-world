import { ReactNode } from 'react';
import clsx from 'clsx';

interface StatsCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: ReactNode;
  iconBg?: string;
  trend?: { value: string; positive: boolean };
}

export default function StatsCard({ label, value, subValue, icon, iconBg = 'bg-orange-50', trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-500 truncate">{label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">{value}</p>
          {subValue && <p className="text-xs text-slate-400 mt-0.5">{subValue}</p>}
          {trend && (
            <div className={clsx('flex items-center gap-1 mt-2 text-xs font-medium', trend.positive ? 'text-emerald-600' : 'text-rose-500')}>
              <span>{trend.positive ? '↑' : '↓'}</span>
              <span>{trend.value} vs last month</span>
            </div>
          )}
        </div>
        <div className={clsx('w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0', iconBg)}>
          {icon}
        </div>
      </div>
    </div>
  );
}
