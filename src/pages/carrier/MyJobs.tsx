import { useState } from 'react';
import { ArrowRight, MapPin, CheckCircle, Clock, Truck } from 'lucide-react';
import { MOCK_LOADS } from '../../data/mock';
import { LoadStatusBadge } from '../../components/ui/Badge';
import { LoadStatus } from '../../types';

const CARRIER_JOBS = MOCK_LOADS.filter(l => l.carrierId === 'u2');

const STATUS_FILTERS: { label: string; value: LoadStatus | 'all' }[] = [
  { label: 'All Jobs', value: 'all' },
  { label: 'In Transit', value: 'in_transit' },
  { label: 'Assigned', value: 'assigned' },
  { label: 'Delivered', value: 'delivered' },
];

export default function MyJobs() {
  const [filter, setFilter] = useState<LoadStatus | 'all'>('all');

  const filtered = CARRIER_JOBS.filter(l => filter === 'all' || l.status === filter);
  const totalEarned = CARRIER_JOBS.filter(l => l.status === 'delivered').reduce((s, l) => s + l.price, 0);
  const completionRate = Math.round((CARRIER_JOBS.filter(l => l.status === 'delivered').length / CARRIER_JOBS.length) * 100);

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-slate-900">My Jobs</h1>
        <p className="text-sm text-slate-400 mt-1">{CARRIER_JOBS.length} total jobs · {completionRate}% completion rate</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Jobs', value: CARRIER_JOBS.length, color: 'bg-slate-100 text-slate-800' },
          { label: 'In Transit', value: CARRIER_JOBS.filter(l => l.status === 'in_transit').length, color: 'bg-orange-100 text-orange-800' },
          { label: 'Delivered', value: CARRIER_JOBS.filter(l => l.status === 'delivered').length, color: 'bg-emerald-100 text-emerald-800' },
          { label: 'Total Earned', value: `$${totalEarned.toLocaleString()}`, color: 'bg-blue-100 text-blue-800' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl p-4 ${s.color}`}>
            <div className="text-xl font-black">{s.value}</div>
            <div className="text-xs font-medium opacity-70 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              filter === f.value ? 'bg-orange-500 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Jobs list */}
      <div className="space-y-3">
        {filtered.map(job => (
          <div key={job.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="text-xs font-bold text-orange-600">{job.id}</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{job.cargoType}</span>
                  <LoadStatusBadge status={job.status} />
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <MapPin size={13} className="text-orange-500 flex-shrink-0" />
                  {job.origin.city}
                  <ArrowRight size={12} className="text-slate-400" />
                  {job.destination.city}
                </div>

                <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Truck size={11} /> {job.truckType}</span>
                  <span>{job.cargoWeight}T cargo</span>
                  <span>{job.distance.toLocaleString()} km</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> {job.pickupDate}</span>
                </div>

                {job.status === 'in_transit' && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>{job.origin.city}</span>
                      <span className="text-orange-600 font-semibold">62% complete</span>
                      <span>{job.destination.city}</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded-full">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '62%' }} />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">ETA: {job.deliveryDate}</p>
                  </div>
                )}

                {job.status === 'delivered' && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                    <CheckCircle size={12} />
                    Delivered {job.deliveryDate} · Payment released
                  </div>
                )}
              </div>

              <div className="flex-shrink-0 text-right">
                <div className="text-xl font-black text-slate-900">${job.price.toLocaleString()}</div>
                <div className="text-xs text-slate-400">{job.currency}</div>
                {job.status === 'delivered' && (
                  <div className="mt-1 text-xs font-semibold text-emerald-600">✓ Paid</div>
                )}
                {job.status === 'in_transit' && (
                  <button className="mt-2 text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-50 px-3 py-1.5 rounded-lg transition-colors">
                    Update Status
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
            <Truck size={40} className="mx-auto mb-3 text-slate-200" />
            <p className="text-slate-400 font-medium">No jobs in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
