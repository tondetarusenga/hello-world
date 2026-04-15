import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { TrendingUp, DollarSign, Package, Users, Globe } from 'lucide-react';
import { ADMIN_MONTHLY_REVENUE, TOP_ROUTES, ALL_USERS } from '../../data/mock';
import StatsCard from '../../components/ui/StatsCard';
import Card, { CardHeader } from '../../components/ui/Card';

const USER_ROLE_DATA = [
  { name: 'Shippers', value: ALL_USERS.filter(u => u.role === 'shipper').length, color: '#F97316' },
  { name: 'Carriers', value: ALL_USERS.filter(u => u.role === 'carrier').length, color: '#3B82F6' },
  { name: 'Fleet Managers', value: ALL_USERS.filter(u => u.role === 'fleet_manager').length, color: '#10B981' },
];

const COUNTRY_DATA = [
  { name: 'Zimbabwe', value: ALL_USERS.filter(u => u.country === 'Zimbabwe').length, color: '#F97316' },
  { name: 'South Africa', value: ALL_USERS.filter(u => u.country === 'South Africa').length, color: '#10B981' },
];

const CARGO_DATA = [
  { type: 'Consumer Goods', loads: 68, revenue: 163200 },
  { type: 'Agricultural', loads: 54, revenue: 151200 },
  { type: 'Mining Equip.', loads: 38, revenue: 182400 },
  { type: 'Construction', loads: 42, revenue: 134400 },
  { type: 'Textiles', loads: 29, revenue: 52200 },
  { type: 'Fresh Produce', loads: 17, revenue: 35700 },
];

export default function AdminAnalytics() {
  const totalRevenue = ADMIN_MONTHLY_REVENUE.reduce((s, m) => s + m.amount, 0);
  const totalLoads = ADMIN_MONTHLY_REVENUE.reduce((s, m) => s + (m.loads || 0), 0);
  const thisMonth = ADMIN_MONTHLY_REVENUE[ADMIN_MONTHLY_REVENUE.length - 1];
  const lastMonth = ADMIN_MONTHLY_REVENUE[ADMIN_MONTHLY_REVENUE.length - 2];
  const growth = Math.round(((thisMonth.amount - lastMonth.amount) / lastMonth.amount) * 100);

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">Platform performance insights</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Total Revenue (12M)"
          value={`$${(totalRevenue / 1000).toFixed(0)}k`}
          subValue="All time platform revenue"
          icon={<DollarSign size={20} className="text-emerald-500" />}
          iconBg="bg-emerald-50"
          trend={{ value: `+${growth}%`, positive: growth > 0 }}
        />
        <StatsCard
          label="Total Loads (12M)"
          value={totalLoads.toLocaleString()}
          subValue="Loads processed"
          icon={<Package size={20} className="text-orange-500" />}
          iconBg="bg-orange-50"
          trend={{ value: '+31%', positive: true }}
        />
        <StatsCard
          label="Avg. Load Value"
          value={`$${Math.round(totalRevenue / totalLoads).toLocaleString()}`}
          subValue="Per load (USD)"
          icon={<TrendingUp size={20} className="text-blue-500" />}
          iconBg="bg-blue-50"
        />
        <StatsCard
          label="Countries"
          value="2"
          subValue="ZW & SA active"
          icon={<Globe size={20} className="text-purple-500" />}
          iconBg="bg-purple-50"
        />
      </div>

      {/* Revenue + Loads Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card padding="lg">
          <CardHeader title="Monthly Revenue" subtitle="USD, last 12 months" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ADMIN_MONTHLY_REVENUE} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <Area type="monotone" dataKey="amount" stroke="#F97316" strokeWidth={2.5} fill="url(#aGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card padding="lg">
          <CardHeader title="Monthly Load Volume" subtitle="Loads processed, last 12 months" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ADMIN_MONTHLY_REVENUE} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => [v, 'Loads']} contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <Bar dataKey="loads" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* User Distribution + Country */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card padding="lg">
          <CardHeader title="User Roles" subtitle="Platform user distribution" />
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={USER_ROLE_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                {USER_ROLE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => [v, 'Users']} contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {USER_ROLE_DATA.map(item => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value} ({Math.round(item.value / ALL_USERS.filter(u => u.role !== 'admin').length * 100)}%)</span>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="lg">
          <CardHeader title="By Country" subtitle="User country breakdown" />
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={COUNTRY_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                {COUNTRY_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => [v, 'Users']} contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {COUNTRY_DATA.map(item => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Routes */}
        <Card padding="lg">
          <CardHeader title="Top Routes" subtitle="By revenue generated" />
          <div className="space-y-3">
            {TOP_ROUTES.slice(0, 4).map((route, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700 truncate pr-2">{route.route}</span>
                  <span className={`font-bold flex-shrink-0 ${route.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-500'}`}>{route.trend}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(route.revenue / TOP_ROUTES[0].revenue) * 100}%` }} />
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{route.loads} loads</span>
                  <span>${(route.revenue / 1000).toFixed(0)}k</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Cargo type breakdown */}
      <Card padding="lg">
        <CardHeader title="Revenue by Cargo Type" subtitle="All time breakdown" />
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={CARGO_DATA} margin={{ top: 4, right: 4, left: 10, bottom: 0 }} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
            <YAxis type="category" dataKey="type" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} width={95} />
            <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
            <Bar dataKey="revenue" fill="#F97316" radius={[0, 6, 6, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
