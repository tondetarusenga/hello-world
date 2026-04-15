import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Star, Briefcase, TrendingUp, ArrowRight, MapPin, Package, CheckCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { AVAILABLE_LOADS, CARRIER_WEEKLY_EARNINGS, MOCK_LOADS } from '../../data/mock';
import StatsCard from '../../components/ui/StatsCard';
import Card, { CardHeader } from '../../components/ui/Card';

const CARRIER_JOBS = MOCK_LOADS.filter(l => l.carrierId === 'u2');
const ACTIVE_JOB = CARRIER_JOBS.find(l => l.status === 'in_transit');

export default function CarrierDashboard() {
  const { user } = useStore();
  const firstName = user?.name.split(' ')[0] || 'there';

  const totalEarnings = CARRIER_WEEKLY_EARNINGS.reduce((s, w) => s + w.amount, 0);
  const thisWeek = CARRIER_WEEKLY_EARNINGS[CARRIER_WEEKLY_EARNINGS.length - 1].amount;

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Welcome back, {firstName}</h1>
          <p className="text-sm text-slate-400 mt-1">You have {AVAILABLE_LOADS.length} loads available near you</p>
        </div>
        <Link
          to="/carrier/available"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm self-start sm:self-auto"
        >
          <Package size={16} />
          Find Loads
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Active Jobs"
          value={CARRIER_JOBS.filter(l => l.status === 'in_transit' || l.status === 'assigned').length}
          subValue="Currently on road"
          icon={<Briefcase size={20} className="text-orange-500" />}
          iconBg="bg-orange-50"
        />
        <StatsCard
          label="This Week"
          value={`$${thisWeek.toLocaleString()}`}
          subValue="USD earned"
          icon={<DollarSign size={20} className="text-emerald-500" />}
          iconBg="bg-emerald-50"
          trend={{ value: '+14%', positive: true }}
        />
        <StatsCard
          label="Rating"
          value="4.9 ★"
          subValue="312 total trips"
          icon={<Star size={20} className="text-amber-500" />}
          iconBg="bg-amber-50"
        />
        <StatsCard
          label="Total Earned (8W)"
          value={`$${totalEarnings.toLocaleString()}`}
          subValue="Last 8 weeks"
          icon={<TrendingUp size={20} className="text-blue-500" />}
          iconBg="bg-blue-50"
          trend={{ value: '+22%', positive: true }}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Earnings chart */}
        <Card className="lg:col-span-2" padding="lg">
          <CardHeader
            title="Weekly Earnings"
            subtitle="USD earned per week, last 8 weeks"
            action={<span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">+22% avg</span>}
          />
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={CARRIER_WEEKLY_EARNINGS} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip
                formatter={(v: number) => [`$${v.toLocaleString()}`, 'Earnings']}
                contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px' }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#F97316"
                strokeWidth={2.5}
                dot={{ fill: '#F97316', r: 4, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Active Job */}
        <Card padding="lg">
          <CardHeader title="Active Job" />
          {ACTIVE_JOB ? (
            <div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-orange-600">{ACTIVE_JOB.id}</span>
                  <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-semibold">In Transit</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 mt-2">
                  {ACTIVE_JOB.origin.city}
                  <ArrowRight size={12} className="text-slate-400" />
                  {ACTIVE_JOB.destination.city}
                </div>
                <div className="text-xs text-slate-500 mt-1">{ACTIVE_JOB.cargoType} · {ACTIVE_JOB.cargoWeight}T</div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                    <span>Progress</span>
                    <span className="font-semibold text-orange-600">62%</span>
                  </div>
                  <div className="h-2 bg-orange-100 rounded-full">
                    <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: '62%' }} />
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-slate-400">ETA</p>
                    <p className="text-sm font-bold text-slate-800">{ACTIVE_JOB.deliveryDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Payout</p>
                    <p className="text-sm font-bold text-emerald-600">${ACTIVE_JOB.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <button className="w-full text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors flex items-center justify-center gap-1.5">
                Update Location <MapPin size={13} />
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle size={32} className="mx-auto mb-2 text-slate-200" />
              <p className="text-sm text-slate-400">No active jobs</p>
              <Link to="/carrier/available" className="text-xs text-orange-600 font-semibold mt-1 block">Browse available loads →</Link>
            </div>
          )}
        </Card>
      </div>

      {/* Available Loads Nearby */}
      <Card padding="none">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Loads Near You</h3>
            <p className="text-sm text-slate-400 mt-0.5">Matched to your truck — ABD 2341 ZW (30T)</p>
          </div>
          <Link to="/carrier/available" className="text-sm text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="divide-y divide-slate-50">
          {AVAILABLE_LOADS.slice(0, 3).map(load => (
            <div key={load.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-orange-600">{load.id}</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{load.cargoType}</span>
                  {load.refrigerated && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">❄ Refrigerated</span>}
                </div>
                <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 mt-1.5">
                  <MapPin size={12} className="text-slate-400 flex-shrink-0" />
                  {load.origin.city}
                  <ArrowRight size={11} className="text-slate-400" />
                  {load.destination.city}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {load.cargoWeight}T · {load.distance} km · {load.truckType} · Pickup: {load.pickupDate}
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right">
                  <div className="text-lg font-black text-slate-900">${load.price.toLocaleString()}</div>
                  <div className="text-xs text-slate-400">{load.currency}</div>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap">
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
