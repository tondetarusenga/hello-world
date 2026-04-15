import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Truck, ChevronRight, Package, Users, BarChart2 } from 'lucide-react';
import { useStore, DEMO_USERS } from '../../store/useStore';
import { UserRole } from '../../types';

const ROLE_OPTIONS = [
  {
    role: 'shipper' as UserRole,
    title: 'Shipper',
    desc: 'I have cargo that needs to be moved',
    icon: <Package size={20} className="text-orange-500" />,
    color: 'orange',
  },
  {
    role: 'carrier' as UserRole,
    title: 'Carrier / Driver',
    desc: 'I own a truck and move freight',
    icon: <Truck size={20} className="text-blue-500" />,
    color: 'blue',
  },
  {
    role: 'fleet_manager' as UserRole,
    title: 'Fleet Manager',
    desc: 'I manage a fleet of trucks and drivers',
    icon: <Users size={20} className="text-emerald-500" />,
    color: 'emerald',
  },
];

export default function Register() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole>('shipper');
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(DEMO_USERS[selectedRole]);
    const paths: Record<UserRole, string> = {
      shipper: '/shipper/dashboard',
      carrier: '/carrier/dashboard',
      fleet_manager: '/fleet/dashboard',
      admin: '/admin/dashboard',
    };
    navigate(paths[selectedRole]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Truck size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-slate-900 font-bold text-xl">Sumiko</span>
        </Link>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step >= s ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-400'
              }`}>
                {s}
              </div>
              {s < 2 && <div className={`h-0.5 w-16 transition-colors ${step > s ? 'bg-orange-500' : 'bg-slate-200'}`} />}
            </div>
          ))}
          <span className="ml-2 text-xs text-slate-400">{step === 1 ? 'Choose Role' : 'Your Details'}</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          {step === 1 ? (
            <>
              <h1 className="text-2xl font-black text-slate-900">Join Sumiko</h1>
              <p className="text-slate-500 mt-2 text-sm">How will you use Sumiko?</p>

              <div className="mt-6 space-y-3">
                {ROLE_OPTIONS.map(opt => (
                  <button
                    key={opt.role}
                    onClick={() => setSelectedRole(opt.role)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                      selectedRole === opt.role
                        ? 'border-orange-400 bg-orange-50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      selectedRole === opt.role ? 'bg-orange-100' : 'bg-slate-100'
                    }`}>
                      {opt.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 text-sm">{opt.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{opt.desc}</div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedRole === opt.role ? 'border-orange-500 bg-orange-500' : 'border-slate-300'
                    }`}>
                      {selectedRole === opt.role && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                Continue <ChevronRight size={16} />
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-black text-slate-900">Create your account</h1>
              <p className="text-slate-500 mt-2 text-sm">Registering as: <span className="font-semibold text-orange-600 capitalize">{selectedRole.replace('_', ' ')}</span></p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      placeholder="Tendai Moyo"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                      className="block w-full rounded-lg border border-slate-300 bg-white text-slate-900 text-sm placeholder-slate-400 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Name</label>
                    <input
                      type="text"
                      placeholder="Moyo Trading Ltd"
                      value={form.company}
                      onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                      className="block w-full rounded-lg border border-slate-300 bg-white text-slate-900 text-sm placeholder-slate-400 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address <span className="text-rose-500">*</span></label>
                  <input
                    type="email"
                    placeholder="you@company.co.zw"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                    className="block w-full rounded-lg border border-slate-300 bg-white text-slate-900 text-sm placeholder-slate-400 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number <span className="text-rose-500">*</span></label>
                  <input
                    type="tel"
                    placeholder="+263 77 000 0000"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    required
                    className="block w-full rounded-lg border border-slate-300 bg-white text-slate-900 text-sm placeholder-slate-400 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Password <span className="text-rose-500">*</span></label>
                  <input
                    type="password"
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    required
                    minLength={8}
                    className="block w-full rounded-lg border border-slate-300 bg-white text-slate-900 text-sm placeholder-slate-400 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <input type="checkbox" id="terms" required className="mt-0.5 accent-orange-500" />
                  <label htmlFor="terms" className="text-xs text-slate-500 leading-relaxed">
                    I agree to Sumiko's{' '}
                    <a href="#" className="text-orange-600 hover:underline">Terms of Service</a>{' '}
                    and{' '}
                    <a href="#" className="text-orange-600 hover:underline">Privacy Policy</a>
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl text-sm transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-sm transition-colors"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-orange-600 hover:text-orange-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
