import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Truck, Users, TrendingUp, AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { MOCK_TRUCKS, MOCK_DRIVERS } from '../../data/mock';
import StatsCard from '../../components/ui/StatsCard';
import Card, { CardHeader } from '../../components/ui/Card';
import { TruckStatusBadge, DriverStatusBadge } from '../../components/ui/Badge';

const OWNER_TRUCKS = MOCK_TRUCKS.filter(t => t.ownerId === 'u3');
const OWNER_DRIVERS = MOCK_DRIVERS.filter(d => d.ownerId === 'u3');

const TRUCK_STATUS_DATA = [
  { name: 'On Job', value: OWNER_TRUCKS.filter(t => t.status === 'on_job').length, color: '#F97316' },
  { name: 'Available', value: OWNER_TRUCKS.filter(t => t.status === 'available').length, color: '#10B981' },
  { name: 'Maintenance', value: OWNER_TRUCKS.filter(t => t.status === 'maintenance').length, color: '#F59E0B' },
  { name: 'Offline', value: OWNER_TRUCKS.filter(t => t.status === 'offline').length, color: '#CBD5E1' },
];

const WEEKLY_REVENUE = [
  { week: 'W1', revenue: 8400 },
  { week: 'W2', revenue: 11200 },
  { week: 'W3', revenue: 9600 },
  { week: 'W4', revenue: 13800 },
  { week: 'W5', revenue: 12100 },
  { week: 'W6', revenue: 15200 },
];

export default function FleetDashboard() {
  const { user } = useStore();
  const firstName = user?.name.split(' ')[0] || 'there';
  const utilization = Math.round((OWNER_TRUCKS.filter(t => t.status === 'on_job').length / OWNER_TRUCKS.length) * 100);

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Fleet Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">{user?.company} · {OWNER_TRUCKS.length} trucks · {OWNER_DRIVERS.length} drivers</p>
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          <Link to="/fleet/trucks" className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
            <Truck size={15} />
            Manage Fleet
          </Link>
          <Link to="/fleet/drivers" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
            <Users size={15} />
            Drivers
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Total Trucks"
          value={OWNER_TRUCKS.length}
          subValue={`${utilization}% utilization`}
          icon={<Truck size={20} className="text-orange-500" />}
          iconBg="bg-orange-50"
        />
        <StatsCard
          label="On Road Now"
          value={OWNER_TRUCKS.filter(t => t.status === 'on_job').length}
          subValue="Active deliveries"
          icon={<TrendingUp size={20} className="text-emerald-500" />}
          iconBg="bg-emerald-50"
          trend={{ value: '37%', positive: true }}
        />
        <StatsCard
          label="In Maintenance"
          value={OWNER_TRUCKS.filter(t => t.status === 'maintenance').length}
          subValue="Needs attention"
          icon={<AlertTriangle size={20} className="text-amber-500" />}
          iconBg="bg-amber-50"
        />
        <StatsCard
          label="Active Drivers"
          value={OWNER_DRIVERS.filter(d => d.status !== 'offline').length}
          subValue={`${OWNER_DRIVERS.length} total drivers`}
          icon={<Users size={20} className="text-blue-500" />}
          iconBg="bg-blue-50"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <Card className="lg:col-span-2" padding="lg">
          <CardHeader
            title="Fleet Revenue"
            subtitle="Weekly USD earnings across all trucks"
            action={<span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">+27% MoM</span>}
          />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={WEEKLY_REVENUE} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <Bar dataKey="revenue" fill="#F97316" radius={[6, 6, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Fleet Status Pie */}
        <Card padding="lg">
          <CardHeader title="Fleet Status" subtitle="Current truck allocation" />
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={TRUCK_STATUS_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {TRUCK_STATUS_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => [v, 'Trucks']} contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-2">
            {TRUCK_STATUS_DATA.map(item => (
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
      </div>

      {/* Trucks grid */}
      <Card padding="none">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Fleet Overview</h3>
            <p className="text-sm text-slate-400 mt-0.5">All {OWNER_TRUCKS.length} trucks</p>
          </div>
          <Link to="/fleet/trucks" className="text-sm text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1">
            Manage <ArrowRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Truck</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Driver</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Location</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Mileage</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {OWNER_TRUCKS.slice(0, 5).map(truck => (
                <tr key={truck.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-bold text-sm text-slate-900">{truck.plateNumber}</div>
                    <div className="text-xs text-slate-400">{truck.year} {truck.make} {truck.model} · {truck.capacityTons}T</div>
                  </td>
                  <td className="px-5 py-3.5">
                    {truck.driverName ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-700">
                          {truck.driverName[0]}
                        </div>
                        <span className="text-sm text-slate-700">{truck.driverName}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-600">{truck.currentLocation}</td>
                  <td className="px-5 py-3.5 text-sm text-slate-600">{truck.mileage.toLocaleString()} km</td>
                  <td className="px-5 py-3.5"><TruckStatusBadge status={truck.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Top Drivers */}
      <Card padding="lg">
        <CardHeader title="Top Performing Drivers" subtitle="Ranked by rating and trips completed" />
        <div className="space-y-3">
          {OWNER_DRIVERS.filter(d => d.status !== 'offline').sort((a, b) => b.rating - a.rating).slice(0, 4).map((driver, i) => (
            <div key={driver.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="text-sm font-black text-slate-300 w-5">#{i + 1}</div>
              <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {driver.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-900 text-sm">{driver.name}</div>
                <div className="text-xs text-slate-400">{driver.totalTrips} trips · {driver.city}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-amber-500">★ {driver.rating}</div>
                <DriverStatusBadge status={driver.status} />
              </div>
            </div>
          ))}
        </div>
        <Link to="/fleet/drivers" className="mt-4 flex items-center justify-center gap-1.5 text-sm text-orange-600 font-semibold hover:text-orange-700 transition-colors">
          View all drivers <ArrowRight size={14} />
        </Link>
      </Card>
    </div>
  );
}
