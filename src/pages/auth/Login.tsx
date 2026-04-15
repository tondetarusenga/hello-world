import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Truck, ArrowRight, Package, Users, BarChart2, Shield } from 'lucide-react';
import { useStore, DEMO_USERS } from '../../store/useStore';
import { UserRole } from '../../types';

const ROLE_CARDS = [
  {
    role: 'shipper' as UserRole,
    title: 'Shipper',
    desc: 'I need to move cargo',
    icon: <Package size={24} className="text-orange-500" />,
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    path: '/shipper/dashboard',
    color: 'text-orange-600',
    example: 'Tendai Moyo · Moyo Trading Ltd',
  },
  {
    role: 'carrier' as UserRole,
    title: 'Carrier / Driver',
    desc: 'I move freight for others',
    icon: <Truck size={24} className="text-blue-500" />,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    path: '/carrier/dashboard',
    color: 'text-blue-600',
    example: 'Chisomo Banda · Banda Transport',
  },
  {
    role: 'fleet_manager' as UserRole,
    title: 'Fleet Manager',
    desc: 'I manage trucks and drivers',
    icon: <Users size={24} className="text-emerald-500" />,
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    path: '/fleet/dashboard',
    color: 'text-emerald-600',
    example: 'Sibongile Dube · Dube Transport',
  },
  {
    role: 'admin' as UserRole,
    title: 'Admin',
    desc: 'Platform administration',
    icon: <BarChart2 size={24} className="text-purple-500" />,
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    path: '/admin/dashboard',
    color: 'text-purple-600',
    example: 'Rudo Matsika · Sumiko',
  },
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [selected, setSelected] = useState<UserRole | null>(null);

  const handleDemoLogin = (role: UserRole, path: string) => {
    login(DEMO_USERS[role]);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-96 gradient-hero p-10 flex-shrink-0">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Truck size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">Sumiko</span>
        </Link>

        <div>
          <h2 className="text-3xl font-black text-white leading-tight mb-4">
            Move Freight.<br />
            <span className="text-gradient">Smarter.</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Zimbabwe and South Africa's most trusted digital freight platform.
          </p>
          <div className="mt-8 space-y-3">
            {['12,500+ loads moved', '2,800+ verified carriers', '98.2% on-time delivery'].map(item => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                <Shield size={14} className="text-emerald-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <p className="text-slate-500 text-xs">© 2024 Sumiko. Registered in Zimbabwe.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-lg">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
              <Truck size={14} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-slate-900 font-bold text-lg">Sumiko</span>
          </Link>

          <h1 className="text-2xl font-black text-slate-900">Welcome back</h1>
          <p className="text-slate-500 mt-1.5 text-sm">
            This is a live demo. Select your role to explore the platform.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ROLE_CARDS.map((card) => (
              <button
                key={card.role}
                onClick={() => handleDemoLogin(card.role, card.path)}
                className={`text-left p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                  selected === card.role
                    ? `${card.border} ${card.bg} shadow-md`
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className={`w-11 h-11 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
                  {card.icon}
                </div>
                <div className="font-bold text-slate-900 text-sm">{card.title}</div>
                <div className="text-xs text-slate-500 mt-0.5">{card.desc}</div>
                <div className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-100">
                  Demo: {card.example}
                </div>
                <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${card.color}`}>
                  Enter as {card.title} <ArrowRight size={12} />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-slate-50 px-4 text-xs text-slate-400">or sign in with your credentials</span>
            </div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={e => { e.preventDefault(); }}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="block w-full rounded-lg border border-slate-300 bg-white text-slate-900 text-sm placeholder-slate-400 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="block w-full rounded-lg border border-slate-300 bg-white text-slate-900 text-sm placeholder-slate-400 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0A0F1E] hover:bg-[#141C2E] text-white font-semibold py-3 rounded-lg text-sm transition-colors"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            New to Sumiko?{' '}
            <Link to="/register" className="font-semibold text-orange-600 hover:text-orange-700 transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
