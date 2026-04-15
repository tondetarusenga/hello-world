import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Package, Users, TrendingUp, DollarSign, ArrowRight, Activity, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { ADMIN_MONTHLY_REVENUE, MOCK_LOADS, ALL_USERS, TOP_ROUTES } from '../../data/mock';
import StatsCard from '../../components/ui/StatsCard';
import Card, { CardHeader } from '../../components/ui/Card';
import { LoadStatusBadge } from '../../components/ui/Badge';

const RECENT_ACTIVITY = [
  { icon: <CheckCircle size={14} className="text-emerald-500" />, text: 'Load L-2024-002 delivered — Bulawayo → Cape Town', time: '2 min ago', type: 'success' },
  { icon: <Package size={14} className="text-blue-500" />, text: 'New load posted by Ndlovu Manufacturing (L-2024-007)', time: '15 min ago', type: 'info' },
  { icon: <Users size={14} className="text-purple-500" />, text: 'New carrier verified: Sipho Mokoena (Johannesburg)', time: '1 hour ago', type: 'info' },
  { icon: <AlertTriangle size={14} className="text-amber-500" />, text: 'Load L-2024-008 cancelled by shipper', time: '2 hours ago', type: 'warning' },
  { icon: <DollarSign size={14} className="text-emerald-500" />, text: 'Payment processed: $3,800 for L-2024-002', time: '2 hours ago', type: 'success' },
  { icon: <Clock size={14} className="text-slate-400" />, text: 'Carrier Thabo Nkosi accepted load L-2024-003', time: '4 hours ago', type: 'neutral' },
];

export default function AdminDashboard() {
  const totalRevenue = ADMIN_MONTHLY_REVENUE.reduce((s, m) => s + m.amount, 0);
  const thisMonth = ADMIN_MONTHLY_REVENUE[ADMIN_MONTHLY_REVENUE.length - 1];
  const lastMonth = ADMIN_MONTHLY_REVENUE[ADMIN_MONTHLY_REVENUE.length - 2];
  const revenueGrowth = Math.round(((thisMonth.amount - lastMonth.amount) / lastMonth.amount) * 100);

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Platform Overview</h1>
          <p className="text-sm text-slate-400 mt-1">Sumiko Network · Zimbabwe & South Africa</p>
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-2 rounded-xl border border-emerald-200">
            <Activity size={12} />
            Platform Online
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Loads This Month"
          value={thisMonth.loads || 248}
          subValue="June 2024"
          icon={<Package size={20} className="text-orange-500" />}
          iconBg="bg-orange-50"
          trend={{ value: `+${revenueGrowth}%`, positive: revenueGrowth > 0 }}
        />
        <StatsCard
          label="Platform Revenue"
          value={`$${(thisMonth.amount / 1000).toFixed(0)}k`}
          subValue={`$${(totalRevenue / 1000).toFixed(0)}k all time`}
          icon={<DollarSign size={20} className="text-emerald-500" />}
          iconBg="bg-emerald-50"
          trend={{ value: `+${revenueGrowth}%`, positive: revenueGrowth > 0 }}
        />
        <StatsCard
          label="Registered Users"
          value={ALL_USERS.length}
          subValue="Shippers + Carriers"
          icon={<Users size={20} className="text-blue-500" />}
          iconBg="bg-blue-50"
          trend={{ value: '+3 this week', positive: true }}
        />
        <StatsCard
          label="Active Loads"
          value={MOCK_LOADS.filter(l => l.status !== 'cancelled' && l.status !== 'delivered').length}
          subValue="Posted + In transit"
          icon={<TrendingUp size={20} className="text-purple-500" />}
          iconBg="bg-purple-50"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2" padding="lg">
          <CardHeader
            title="Platform Revenue"
            subtitle="Monthly USD, last 12 months"
            action={<span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">+{revenueGrowth}% MoM</span>}
          />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ADMIN_MONTHLY_REVENUE} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <Area type="monotone" dataKey="amount" stroke="#F97316" strokeWidth={2.5} fill="url(#revenueGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Activity Feed */}
        <Card padding="lg">
          <CardHeader title="Live Activity" subtitle="Platform events" />
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  item.type === 'success' ? 'bg-emerald-50' : item.type === 'warning' ? 'bg-amber-50' : item.type === 'info' ? 'bg-blue-50' : 'bg-slate-100'
                }`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-700 leading-relaxed">{item.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Load Volume + Top Routes */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Load volume chart */}
        <Card padding="lg">
          <CardHeader title="Load Volume" subtitle="Monthly loads posted, last 12 months" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ADMIN_MONTHLY_REVENUE} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => [v, 'Loads']} contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <Bar dataKey="loads" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Routes */}
        <Card padding="lg">
          <CardHeader
            title="Top Routes"
            subtitle="By load volume, all time"
          />
          <div className="space-y-3">
            {TOP_ROUTES.map((route, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500 flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-slate-800">{route.route}</span>
                    <span className={`text-xs font-bold ${route.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {route.trend}
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${(route.loads / TOP_ROUTES[0].loads) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>{route.loads} loads</span>
                    <span>${route.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Loads */}
      <Card padding="none">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Recent Loads</h3>
            <p className="text-sm text-slate-400 mt-0.5">Latest activity across the platform</p>
          </div>
          <Link to="/admin/loads" className="text-sm text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Load</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Shipper</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Route</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Value</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_LOADS.slice(0, 5).map(load => (
                <tr key={load.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-bold text-orange-600">{load.id}</span>
                    <div className="text-xs text-slate-400">{load.createdAt}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="text-sm font-medium text-slate-800">{load.shipperName}</div>
                    <div className="text-xs text-slate-400">{load.shipperCompany}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-sm text-slate-700">
                      <span>{load.origin.city}</span>
                      <ArrowRight size={11} className="text-slate-400" />
                      <span>{load.destination.city}</span>
                    </div>
                    <div className="text-xs text-slate-400">{load.distance} km</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-bold text-slate-900">${load.price.toLocaleString()}</span>
                    <div className="text-xs text-slate-400">{load.currency}</div>
                  </td>
                  <td className="px-5 py-3.5"><LoadStatusBadge status={load.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
