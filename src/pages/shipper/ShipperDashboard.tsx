import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, MapPin, TrendingUp, Clock, Plus, ArrowRight, Truck } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { MOCK_LOADS, SHIPPER_MONTHLY_SPEND } from '../../data/mock';
import StatsCard from '../../components/ui/StatsCard';
import Card, { CardHeader } from '../../components/ui/Card';
import { LoadStatusBadge } from '../../components/ui/Badge';

const RECENT_LOADS = MOCK_LOADS.filter(l => l.shipperId === 'u1').slice(0, 5);

export default function ShipperDashboard() {
  const { user } = useStore();
  const firstName = user?.name.split(' ')[0] || 'there';
  const today = new Date().toLocaleDateString('en-ZW', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const activeLoads = MOCK_LOADS.filter(l => l.shipperId === 'u1' && (l.status === 'in_transit' || l.status === 'assigned')).length;
  const openLoads = MOCK_LOADS.filter(l => l.shipperId === 'u1' && l.status === 'posted').length;
  const totalSpend = MOCK_LOADS
    .filter(l => l.shipperId === 'u1' && l.status === 'delivered')
    .reduce((sum, l) => sum + l.price, 0);

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Good morning, {firstName} 👋</h1>
          <p className="text-sm text-slate-400 mt-1">{today}</p>
        </div>
        <Link
          to="/shipper/post-load"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus size={16} />
          Post a Load
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Active Shipments"
          value={activeLoads}
          subValue="In transit or assigned"
          icon={<Truck size={20} className="text-orange-500" />}
          iconBg="bg-orange-50"
          trend={{ value: '2 more', positive: true }}
        />
        <StatsCard
          label="Open Loads"
          value={openLoads}
          subValue="Awaiting carrier"
          icon={<Package size={20} className="text-blue-500" />}
          iconBg="bg-blue-50"
        />
        <StatsCard
          label="Total Spend (Jun)"
          value={`$${(16800).toLocaleString()}`}
          subValue="USD this month"
          icon={<TrendingUp size={20} className="text-emerald-500" />}
          iconBg="bg-emerald-50"
          trend={{ value: '+19%', positive: true }}
        />
        <StatsCard
          label="Avg. Delivery Time"
          value="2.4 days"
          subValue="Harare → Joburg"
          icon={<Clock size={20} className="text-purple-500" />}
          iconBg="bg-purple-50"
          trend={{ value: '0.3d faster', positive: true }}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Spend Chart */}
        <Card className="lg:col-span-2" padding="lg">
          <CardHeader
            title="Freight Spend"
            subtitle="Monthly USD spend, last 6 months"
            action={
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-md font-medium">6M</span>
            }
          />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={SHIPPER_MONTHLY_SPEND} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(v: number) => [`$${v.toLocaleString()}`, 'Spend']}
                contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px' }}
              />
              <Bar dataKey="amount" fill="#F97316" radius={[6, 6, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Active Shipments */}
        <Card padding="lg">
          <CardHeader title="Active Shipments" subtitle="Live updates" />
          <div className="space-y-3">
            {MOCK_LOADS.filter(l => l.shipperId === 'u1' && (l.status === 'in_transit' || l.status === 'assigned')).map(load => (
              <div key={load.id} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400">{load.id}</span>
                  <LoadStatusBadge status={load.status} />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <MapPin size={11} className="text-slate-400 flex-shrink-0" />
                  <span className="truncate">{load.origin.city} → {load.destination.city}</span>
                </div>
                <div className="mt-2 text-xs text-slate-400">
                  {load.cargoType} · {load.cargoWeight}T · <span className="font-semibold text-slate-600">${load.price.toLocaleString()}</span>
                </div>
                {load.status === 'in_transit' && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>{load.origin.city}</span>
                      <span>{load.destination.city}</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '62%' }} />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Est. delivery: {load.deliveryDate}</p>
                  </div>
                )}
              </div>
            ))}
            {activeLoads === 0 && (
              <div className="text-center py-8 text-slate-400">
                <Package size={32} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">No active shipments</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Recent Loads Table */}
      <Card padding="none">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Recent Loads</h3>
            <p className="text-sm text-slate-400 mt-0.5">Your latest freight activity</p>
          </div>
          <Link to="/shipper/loads" className="text-sm text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Load ID</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Route</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Cargo</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Date</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Amount</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {RECENT_LOADS.map(load => (
                <tr key={load.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 text-sm font-semibold text-orange-600">{load.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-700">
                      <span className="font-medium">{load.origin.city}</span>
                      <ArrowRight size={12} className="text-slate-400 flex-shrink-0" />
                      <span className="font-medium">{load.destination.city}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{load.distance.toLocaleString()} km</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm text-slate-700">{load.cargoType}</div>
                    <div className="text-xs text-slate-400">{load.cargoWeight} tons</div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{load.pickupDate}</td>
                  <td className="px-5 py-4 text-sm font-bold text-slate-900">${load.price.toLocaleString()}</td>
                  <td className="px-5 py-4"><LoadStatusBadge status={load.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
