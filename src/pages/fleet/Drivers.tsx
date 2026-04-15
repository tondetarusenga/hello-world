import { useState } from 'react';
import { Search, Plus, Phone, Mail, Star } from 'lucide-react';
import { MOCK_DRIVERS } from '../../data/mock';
import { DriverStatusBadge } from '../../components/ui/Badge';
import { DriverStatus } from '../../types';

const OWNER_DRIVERS = MOCK_DRIVERS.filter(d => d.ownerId === 'u3');

const STATUS_FILTERS: { label: string; value: DriverStatus | 'all' }[] = [
  { label: 'All Drivers', value: 'all' },
  { label: 'Available', value: 'available' },
  { label: 'On Job', value: 'on_job' },
  { label: 'Offline', value: 'offline' },
];

export default function Drivers() {
  const [filter, setFilter] = useState<DriverStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = OWNER_DRIVERS.filter(d => {
    const matchStatus = filter === 'all' || d.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !search || d.name.toLowerCase().includes(q) || d.phone.includes(q) || d.licenseNumber.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const avgRating = (OWNER_DRIVERS.reduce((s, d) => s + d.rating, 0) / OWNER_DRIVERS.length).toFixed(1);

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Drivers</h1>
          <p className="text-sm text-slate-400 mt-1">
            {OWNER_DRIVERS.length} drivers · Avg rating: <span className="text-amber-500 font-bold">★ {avgRating}</span>
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors self-start sm:self-auto">
          <Plus size={15} />
          Add Driver
        </button>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Available', count: OWNER_DRIVERS.filter(d => d.status === 'available').length, color: 'bg-emerald-100 text-emerald-800' },
          { label: 'On Job', count: OWNER_DRIVERS.filter(d => d.status === 'on_job').length, color: 'bg-orange-100 text-orange-800' },
          { label: 'Offline', count: OWNER_DRIVERS.filter(d => d.status === 'offline').length, color: 'bg-slate-100 text-slate-600' },
        ].map(s => (
          <div key={s.label} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${s.color}`}>
            {s.label}: <span className="font-black">{s.count}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search driver name, license..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                filter === f.value ? 'bg-orange-500 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Driver Cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 && (
          <div className="sm:col-span-2 xl:col-span-3 bg-white rounded-xl border border-slate-200 p-16 text-center">
            <p className="text-slate-400 font-medium">No drivers found</p>
          </div>
        )}
        {filtered.map(driver => (
          <div key={driver.id} className="bg-white rounded-xl border border-slate-200 p-5 card-hover">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-base font-bold flex-shrink-0">
                {driver.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-900">{driver.name}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-amber-500 font-bold">★ {driver.rating}</span>
                  <span className="text-xs text-slate-400">· {driver.totalTrips} trips</span>
                </div>
              </div>
              <DriverStatusBadge status={driver.status} />
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Phone size={13} className="text-slate-400" />
                <span className="text-slate-600">{driver.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail size={13} className="text-slate-400" />
                <span className="text-slate-600 truncate">{driver.email}</span>
              </div>
            </div>

            {/* License */}
            <div className="pt-3 border-t border-slate-100 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">License #</span>
                <span className="font-semibold text-slate-700">{driver.licenseNumber}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">License Expiry</span>
                <span className={`font-semibold ${
                  new Date(driver.licenseExpiry) < new Date('2025-12-31') ? 'text-amber-600' : 'text-slate-700'
                }`}>{driver.licenseExpiry}</span>
              </div>
              {driver.truckPlate && (
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Assigned Truck</span>
                  <span className="font-semibold text-orange-600">{driver.truckPlate}</span>
                </div>
              )}
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Based in</span>
                <span className="font-semibold text-slate-700">{driver.city}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-2">
              <button className="flex-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg transition-colors">
                View Profile
              </button>
              {driver.status === 'available' && !driver.truckId && (
                <button className="flex-1 text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition-colors">
                  Assign Truck
                </button>
              )}
              {driver.status === 'available' && driver.truckId && (
                <button className="flex-1 text-xs font-semibold bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
                  Assign Job
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* License expiry warnings */}
      {OWNER_DRIVERS.some(d => new Date(d.licenseExpiry) < new Date('2026-01-01')) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <Star size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-800">License Renewal Reminder</p>
            <p className="text-xs text-amber-700 mt-1">
              {OWNER_DRIVERS.filter(d => new Date(d.licenseExpiry) < new Date('2026-01-01')).map(d => d.name).join(', ')}'s
              {' '}license{OWNER_DRIVERS.filter(d => new Date(d.licenseExpiry) < new Date('2026-01-01')).length > 1 ? 's' : ''} expire before 2026.
              Please ensure renewal is completed to avoid operational disruptions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
