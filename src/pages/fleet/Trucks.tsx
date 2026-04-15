import { useState } from 'react';
import { Truck, Search, Plus, Wrench, MapPin, AlertTriangle } from 'lucide-react';
import { MOCK_TRUCKS } from '../../data/mock';
import { TruckStatusBadge } from '../../components/ui/Badge';
import { TruckStatus } from '../../types';

const OWNER_TRUCKS = MOCK_TRUCKS.filter(t => t.ownerId === 'u3');

const STATUS_FILTERS: { label: string; value: TruckStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Available', value: 'available' },
  { label: 'On Job', value: 'on_job' },
  { label: 'Maintenance', value: 'maintenance' },
  { label: 'Offline', value: 'offline' },
];

export default function Trucks() {
  const [filter, setFilter] = useState<TruckStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = OWNER_TRUCKS.filter(t => {
    const matchStatus = filter === 'all' || t.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !search || t.plateNumber.toLowerCase().includes(q) || t.make.toLowerCase().includes(q) || t.model.toLowerCase().includes(q) || t.type.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const needsService = OWNER_TRUCKS.filter(t => t.status === 'maintenance').length;

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">My Fleet</h1>
          <p className="text-sm text-slate-400 mt-1">{OWNER_TRUCKS.length} trucks total</p>
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          {needsService > 0 && (
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-2 rounded-xl border border-amber-200">
              <AlertTriangle size={13} />
              {needsService} truck{needsService > 1 ? 's' : ''} need{needsService === 1 ? 's' : ''} service
            </div>
          )}
          <button className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
            <Plus size={15} />
            Add Truck
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by plate, make, model..."
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

      {/* Truck Cards Grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 && (
          <div className="sm:col-span-2 xl:col-span-3 bg-white rounded-xl border border-slate-200 p-16 text-center">
            <Truck size={40} className="mx-auto mb-3 text-slate-200" />
            <p className="text-slate-400 font-medium">No trucks found</p>
          </div>
        )}
        {filtered.map(truck => (
          <div key={truck.id} className={`bg-white rounded-xl border-2 p-5 transition-all card-hover ${
            truck.status === 'maintenance' ? 'border-amber-300' : 'border-slate-200'
          }`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  truck.status === 'on_job' ? 'bg-orange-100' : truck.status === 'available' ? 'bg-emerald-100' : truck.status === 'maintenance' ? 'bg-amber-100' : 'bg-slate-100'
                }`}>
                  <Truck size={18} className={
                    truck.status === 'on_job' ? 'text-orange-600' : truck.status === 'available' ? 'text-emerald-600' : truck.status === 'maintenance' ? 'text-amber-600' : 'text-slate-400'
                  } />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{truck.plateNumber}</div>
                  <div className="text-xs text-slate-400">{truck.year} {truck.make}</div>
                </div>
              </div>
              <TruckStatusBadge status={truck.status} />
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Model</span>
                <span className="font-medium text-slate-800">{truck.model}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Type</span>
                <span className="font-medium text-slate-800 text-right text-xs">{truck.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Capacity</span>
                <span className="font-medium text-slate-800">{truck.capacityTons} tons</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Mileage</span>
                <span className="font-medium text-slate-800">{truck.mileage.toLocaleString()} km</span>
              </div>
            </div>

            {/* Location & Driver */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin size={11} />
                <span>{truck.currentLocation}</span>
              </div>
              {truck.driverName ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-600 flex-shrink-0">
                    {truck.driverName[0]}
                  </div>
                  <span className="text-xs text-slate-600">{truck.driverName}</span>
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic">No driver assigned</div>
              )}
            </div>

            {/* Last service */}
            <div className="mt-3 text-xs text-slate-400">
              Last service: {truck.lastService}
              {truck.status === 'maintenance' && (
                <div className="mt-2 flex items-center gap-1.5 text-amber-700 font-semibold">
                  <Wrench size={11} />
                  Currently in service
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-2">
              <button className="flex-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg transition-colors">
                Details
              </button>
              {truck.status === 'available' && (
                <button className="flex-1 text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition-colors">
                  Assign Job
                </button>
              )}
              {truck.status === 'maintenance' && (
                <button className="flex-1 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5">
                  <Wrench size={11} />
                  Service Log
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
