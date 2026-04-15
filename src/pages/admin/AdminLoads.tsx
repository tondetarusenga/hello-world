import { useState } from 'react';
import { Search, ArrowRight, Package, Filter, MoreVertical } from 'lucide-react';
import { MOCK_LOADS } from '../../data/mock';
import { LoadStatusBadge } from '../../components/ui/Badge';
import { LoadStatus } from '../../types';

const STATUS_FILTERS: { label: string; value: LoadStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'posted' },
  { label: 'Assigned', value: 'assigned' },
  { label: 'In Transit', value: 'in_transit' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
];

export default function AdminLoads() {
  const [statusFilter, setStatusFilter] = useState<LoadStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = MOCK_LOADS.filter(l => {
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !search || l.id.toLowerCase().includes(q) || l.shipperName.toLowerCase().includes(q) || l.origin.city.toLowerCase().includes(q) || l.destination.city.toLowerCase().includes(q) || l.cargoType.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const totalValue = MOCK_LOADS.filter(l => l.status !== 'cancelled').reduce((s, l) => s + l.price, 0);
  const deliveredValue = MOCK_LOADS.filter(l => l.status === 'delivered').reduce((s, l) => s + l.price, 0);

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">All Loads</h1>
          <p className="text-sm text-slate-400 mt-1">
            {MOCK_LOADS.length} total · ${totalValue.toLocaleString()} platform value · ${deliveredValue.toLocaleString()} delivered
          </p>
        </div>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Open', value: 'posted' as LoadStatus, color: 'bg-amber-50 border-amber-200 text-amber-800' },
          { label: 'Assigned', value: 'assigned' as LoadStatus, color: 'bg-blue-50 border-blue-200 text-blue-800' },
          { label: 'In Transit', value: 'in_transit' as LoadStatus, color: 'bg-orange-50 border-orange-200 text-orange-800' },
          { label: 'Delivered', value: 'delivered' as LoadStatus, color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
          { label: 'Cancelled', value: 'cancelled' as LoadStatus, color: 'bg-slate-50 border-slate-200 text-slate-600' },
        ].map(s => (
          <button
            key={s.value}
            onClick={() => setStatusFilter(statusFilter === s.value ? 'all' : s.value)}
            className={`rounded-xl p-3 border text-left transition-all ${s.color} ${statusFilter === s.value ? 'ring-2 ring-offset-1 ring-orange-400' : ''}`}
          >
            <div className="text-xl font-black">{MOCK_LOADS.filter(l => l.status === s.value).length}</div>
            <div className="text-xs font-semibold mt-0.5">{s.label}</div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by load ID, shipper, city, cargo type..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === f.value ? 'bg-orange-500 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loads Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Load ID</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Shipper</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Route</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Cargo</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Carrier</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Value</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-16">
                    <Package size={40} className="mx-auto mb-3 text-slate-200" />
                    <p className="text-slate-400 font-medium">No loads found</p>
                  </td>
                </tr>
              )}
              {filtered.map(load => (
                <tr key={load.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-bold text-orange-600">{load.id}</span>
                    <div className="text-xs text-slate-400">{load.createdAt}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="text-sm font-medium text-slate-800">{load.shipperName}</div>
                    <div className="text-xs text-slate-400">{load.shipperCompany}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 text-sm text-slate-700">
                      <span className="font-medium">{load.origin.city}</span>
                      <ArrowRight size={11} className="text-slate-400" />
                      <span className="font-medium">{load.destination.city}</span>
                    </div>
                    <div className="text-xs text-slate-400">{load.distance.toLocaleString()} km</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="text-sm text-slate-700">{load.cargoType}</div>
                    <div className="text-xs text-slate-400">{load.cargoWeight}T</div>
                  </td>
                  <td className="px-5 py-3.5">
                    {load.carrierName ? (
                      <div className="text-sm text-slate-700">{load.carrierName}</div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-bold text-slate-900">${load.price.toLocaleString()}</span>
                    <div className="text-xs text-slate-400">{load.currency}</div>
                  </td>
                  <td className="px-5 py-3.5"><LoadStatusBadge status={load.status} /></td>
                  <td className="px-5 py-3.5">
                    <button className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <p className="text-xs text-slate-400">Showing {filtered.length} of {MOCK_LOADS.length} loads</p>
          <button className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1.5">
            <Filter size={12} />
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
}
