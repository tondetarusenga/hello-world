import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { DollarSign, TrendingUp, CheckCircle, Clock, ArrowDownCircle } from 'lucide-react';
import { CARRIER_WEEKLY_EARNINGS, MOCK_LOADS } from '../../data/mock';
import StatsCard from '../../components/ui/StatsCard';
import Card, { CardHeader } from '../../components/ui/Card';

const CARRIER_JOBS = MOCK_LOADS.filter(l => l.carrierId === 'u2');
const DELIVERED = CARRIER_JOBS.filter(l => l.status === 'delivered');

const PAYOUTS = [
  { id: 'PAY-2024-042', load: 'L-2024-002', amount: 3800, date: '2024-06-06', status: 'paid', route: 'Bulawayo → Cape Town' },
  { id: 'PAY-2024-039', load: 'L-2024-006', amount: 3200, date: '2024-05-24', status: 'paid', route: 'Harare → Pretoria' },
  { id: 'PAY-2024-035', load: 'L-2023-089', amount: 2600, date: '2024-05-10', status: 'paid', route: 'Gweru → Johannesburg' },
  { id: 'PAY-2024-051', load: 'L-2024-001', amount: 2400, date: '2024-06-13', status: 'pending', route: 'Harare → Johannesburg' },
];

const MONTHLY = [
  { month: 'Jan', amount: 6200 },
  { month: 'Feb', amount: 7800 },
  { month: 'Mar', amount: 5400 },
  { month: 'Apr', amount: 9100 },
  { month: 'May', amount: 8400 },
  { month: 'Jun', amount: 6200 },
];

export default function Earnings() {
  const totalEarned = DELIVERED.reduce((s, l) => s + l.price, 0);
  const pending = CARRIER_JOBS.filter(l => l.status === 'in_transit').reduce((s, l) => s + l.price, 0);
  const thisMonth = MONTHLY[MONTHLY.length - 1].amount;

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Earnings</h1>
        <p className="text-sm text-slate-400 mt-1">Your financial performance on Sumiko</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Total Earned"
          value={`$${totalEarned.toLocaleString()}`}
          subValue="All time (USD)"
          icon={<DollarSign size={20} className="text-emerald-500" />}
          iconBg="bg-emerald-50"
        />
        <StatsCard
          label="This Month"
          value={`$${thisMonth.toLocaleString()}`}
          subValue="June 2024"
          icon={<TrendingUp size={20} className="text-orange-500" />}
          iconBg="bg-orange-50"
          trend={{ value: '-26%', positive: false }}
        />
        <StatsCard
          label="Pending Payout"
          value={`$${pending.toLocaleString()}`}
          subValue="On delivery"
          icon={<Clock size={20} className="text-amber-500" />}
          iconBg="bg-amber-50"
        />
        <StatsCard
          label="Jobs Completed"
          value={DELIVERED.length}
          subValue="Paid out"
          icon={<CheckCircle size={20} className="text-blue-500" />}
          iconBg="bg-blue-50"
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card padding="lg">
          <CardHeader title="Monthly Earnings" subtitle="USD earned per month, 2024" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Earnings']} contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <Bar dataKey="amount" fill="#10B981" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card padding="lg">
          <CardHeader title="Weekly Trend" subtitle="Earnings over the last 8 weeks" />
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={CARRIER_WEEKLY_EARNINGS} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Earnings']} contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <Line type="monotone" dataKey="amount" stroke="#F97316" strokeWidth={2.5} dot={{ fill: '#F97316', r: 4, strokeWidth: 2, stroke: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Payout history */}
      <Card padding="none">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Payout History</h3>
            <p className="text-sm text-slate-400 mt-0.5">Payments made to your account</p>
          </div>
          <button className="text-sm text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1.5">
            <ArrowDownCircle size={14} />
            Download Statement
          </button>
        </div>
        <div className="divide-y divide-slate-50">
          {PAYOUTS.map(payout => (
            <div key={payout.id} className="px-5 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                  payout.status === 'paid' ? 'bg-emerald-100' : 'bg-amber-100'
                }`}>
                  {payout.status === 'paid'
                    ? <CheckCircle size={16} className="text-emerald-600" />
                    : <Clock size={16} className="text-amber-600" />
                  }
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{payout.route}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-400">{payout.id}</span>
                    <span className="text-xs text-slate-300">·</span>
                    <span className="text-xs text-slate-400">{payout.load}</span>
                    <span className="text-xs text-slate-300">·</span>
                    <span className="text-xs text-slate-400">{payout.date}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-black text-slate-900">+${payout.amount.toLocaleString()}</div>
                <div className={`text-xs font-semibold mt-0.5 ${payout.status === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {payout.status === 'paid' ? '✓ Paid' : '⏳ Pending'}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/30">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Total paid out</span>
            <span className="font-black text-slate-900">${PAYOUTS.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0).toLocaleString()}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
