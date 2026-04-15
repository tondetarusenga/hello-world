import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, ArrowRight, Package } from 'lucide-react';
import { MOCK_LOADS } from '../../data/mock';
import { LoadStatusBadge } from '../../components/ui/Badge';
import { LoadStatus } from '../../types';

const STATUS_FILTERS: { label: string; value: LoadStatus | 'all' }[] = [
  { label: 'All Loads', value: 'all' },
  { label: 'Open', value: 'posted' },
  { label: 'Assigned', value: 'assigned' },
  { label: 'In Transit', value: 'in_transit' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
];

const SHIPPER_LOADS = MOCK_LOADS.filter(l => l.shipperId === 'u1');

export default function MyLoads() {
  const [statusFilter, setStatusFilter] = useState<LoadStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = SHIPPER_LOADS.filter(l => {
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    const matchSearch =
      search === '' ||
      l.id.toLowerCase().includes(search.toLowerCase()) ||
      l.origin.city.toLowerCase().includes(search.toLowerCase()) ||
      l.destination.city.toLowerCase().includes(search.toLowerCase()) ||
      l.cargoType.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalSpend = SHIPPER_LOADS.filter(l => l.status === 'delivered').reduce((s, l) => s + l.price, 0);

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">My Loads</h1>
          <p className="text-sm text-slate-400 mt-1">{SHIPPER_LOADS.length} total loads · ${totalSpend.toLocaleString()} delivered</p>
        </div>
        <Link
          to="/shipper/post-load"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm self-start"
        >
          <Plus size={16} />
          Post a Load
        </Link>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Open', count: SHIPPER_LOADS.filter(l => l.status === 'posted').length, color: 'bg-amber-100 text-amber-800' },
          { label: 'In Transit', count: SHIPPER_LOADS.filter(l => l.status === 'in_transit').length, color: 'bg-orange-100 text-orange-800' },
          { label: 'Delivered', count: SHIPPER_LOADS.filter(l => l.status === 'delivered').length, color: 'bg-emerald-100 text-emerald-800' },
          { label: 'Cancelled', count: SHIPPER_LOADS.filter(l => l.status === 'cancelled').length, color: 'bg-slate-100 text-slate-600' },
        ].map(s => (
          <div key={s.label} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${s.color}`}>
            {s.label}: <span className="font-black">{s.count}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by load ID, city, or cargo type..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {STATUS_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === f.value
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Load ID</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Route</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Cargo</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Carrier</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Pickup</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Amount</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-16">
                    <Package size={40} className="mx-auto mb-3 text-slate-200" />
                    <p className="text-slate-400 font-medium">No loads found</p>
                    <p className="text-slate-300 text-sm mt-1">Try a different filter or post a new load</p>
                  </td>
                </tr>
              )}
              {filtered.map(load => (
                <tr key={load.id} className="hover:bg-slate-50/70 transition-colors group">
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-orange-600">{load.id}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-sm">
                      <span className="font-semibold text-slate-800">{load.origin.city}</span>
                      <ArrowRight size={11} className="text-slate-400" />
                      <span className="font-semibold text-slate-800">{load.destination.city}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{load.distance.toLocaleString()} km · {load.truckType}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm text-slate-800">{load.cargoType}</div>
                    <div className="text-xs text-slate-400">{load.cargoWeight} tons</div>
                  </td>
                  <td className="px-5 py-4">
                    {load.carrierName ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                          {load.carrierName[0]}
                        </div>
                        <span className="text-sm text-slate-700">{load.carrierName}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Awaiting carrier</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{load.pickupDate}</td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-slate-900">${load.price.toLocaleString()}</span>
                    <div className="text-xs text-slate-400">{load.currency}</div>
                  </td>
                  <td className="px-5 py-4"><LoadStatusBadge status={load.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
            <p className="text-xs text-slate-400">Showing {filtered.length} of {SHIPPER_LOADS.length} loads</p>
            <div className="flex gap-2">
              <button className="text-xs text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-white transition-colors flex items-center gap-1.5">
                <Filter size={12} />
                Export
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
