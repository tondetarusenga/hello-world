import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Truck, MapPin, Shield, Zap, BarChart2, Clock, ArrowRight,
  Star, CheckCircle, Menu, X, ChevronRight, Globe, Package,
  DollarSign, Users, TrendingUp, Phone
} from 'lucide-react';

const STATS = [
  { value: '12,500+', label: 'Loads Moved' },
  { value: '2,800+', label: 'Verified Carriers' },
  { value: '98.2%', label: 'On-Time Delivery' },
  { value: '2', label: 'Countries Covered' },
];

const FEATURES = [
  {
    icon: <Zap size={22} className="text-orange-500" />,
    title: 'Instant Load Matching',
    desc: 'AI-powered matching connects your freight with the right carrier in under 5 minutes — not hours.',
    bg: 'bg-orange-50',
  },
  {
    icon: <MapPin size={22} className="text-blue-500" />,
    title: 'Real-Time GPS Tracking',
    desc: 'Know exactly where your cargo is at every moment, with live updates direct to your dashboard.',
    bg: 'bg-blue-50',
  },
  {
    icon: <Shield size={22} className="text-emerald-500" />,
    title: 'Verified Carriers Only',
    desc: 'Every carrier is vetted, licensed, and insured. You ship with confidence or you don\'t ship.',
    bg: 'bg-emerald-50',
  },
  {
    icon: <DollarSign size={22} className="text-purple-500" />,
    title: 'Secure Digital Payments',
    desc: 'Pay in USD or ZAR with bank-grade security. Funds released automatically on delivery.',
    bg: 'bg-purple-50',
  },
  {
    icon: <BarChart2 size={22} className="text-rose-500" />,
    title: 'Smart Analytics',
    desc: 'Data-driven insights to optimize your routes, reduce costs, and scale your freight operations.',
    bg: 'bg-rose-50',
  },
  {
    icon: <Clock size={22} className="text-amber-500" />,
    title: '24/7 Local Support',
    desc: 'Dedicated support teams in Harare and Johannesburg, available around the clock.',
    bg: 'bg-amber-50',
  },
];

const TESTIMONIALS = [
  {
    name: 'Tendai Moyo',
    role: 'Director, Moyo Trading Ltd',
    city: 'Harare, Zimbabwe',
    quote: 'Sumiko cut our freight costs by 23% in the first three months. The tracking visibility alone is worth it — I always know where my goods are.',
    rating: 5,
    initial: 'TM',
  },
  {
    name: 'Nomsa Sithole',
    role: 'Logistics Manager, Zimuto Mining',
    city: 'Kwekwe, Zimbabwe',
    quote: 'We move heavy mining equipment across borders regularly. Sumiko\'s verified fleet and compliance documentation has made cross-border logistics seamless.',
    rating: 5,
    initial: 'NS',
  },
  {
    name: 'Sipho Mokoena',
    role: 'Owner, Mokoena Haulage',
    city: 'Johannesburg, South Africa',
    quote: 'As a carrier, Sumiko keeps my trucks loaded. I\'ve increased my monthly revenue by 40% since joining. The platform is simply the best in southern Africa.',
    rating: 5,
    initial: 'SM',
  },
];

const HOW_SHIPPER = [
  { step: '01', title: 'Post Your Load', desc: 'Describe your cargo, set your route, and choose your preferred truck type in under 2 minutes.' },
  { step: '02', title: 'Get Matched', desc: 'Sumiko instantly matches you with verified, available carriers on your route. Review their ratings and accept.' },
  { step: '03', title: 'Track & Pay', desc: 'Monitor your shipment live. Payment releases automatically when delivery is confirmed.' },
];

const HOW_CARRIER = [
  { step: '01', title: 'Create Your Profile', desc: 'Submit your documents, license details, and truck info. Verification takes 24 hours.' },
  { step: '02', title: 'Find Loads Near You', desc: 'Browse loads matched to your truck type and route. Accept instantly from your phone.' },
  { step: '03', title: 'Deliver & Earn', desc: 'Complete the delivery, get rated, and receive fast payment directly to your account.' },
];

export default function Landing() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'shipper' | 'carrier'>('shipper');

  return (
    <div className="min-h-screen font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1E]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Truck size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">Sumiko</span>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">How It Works</a>
              <a href="#features" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">Features</a>
              <a href="#testimonials" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">Stories</a>
              <a href="#coverage" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">Coverage</a>
            </div>

            {/* Auth */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" className="text-slate-300 hover:text-white text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white p-2"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden border-t border-white/10 py-4 space-y-2 animate-fade-in">
              {['How It Works', 'Features', 'Stories', 'Coverage'].map(item => (
                <a key={item} href="#" className="block px-3 py-2 text-slate-300 hover:text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors">
                  {item}
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-2 border-t border-white/10">
                <Link to="/login" className="block text-center text-slate-300 py-2 text-sm font-medium">Log in</Link>
                <Link to="/register" className="block text-center bg-orange-500 text-white py-2.5 rounded-lg text-sm font-semibold">Get Started</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="gradient-hero min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl">
            {/* Label */}
            <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 rounded-full px-4 py-1.5 mb-8">
              <Globe size={14} className="text-orange-400" />
              <span className="text-orange-400 text-sm font-medium">Zimbabwe & South Africa's #1 Freight Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
              Africa's Freight{' '}
              <br />
              Network,{' '}
              <span className="text-gradient">Reimagined.</span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Connect with verified carriers, track shipments in real-time, and move your goods across
              Zimbabwe and South Africa with speed, transparency, and confidence.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-base transition-all hover:shadow-lg hover:shadow-orange-500/25"
              >
                Start Shipping Now
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all"
              >
                <Truck size={18} />
                Join as Carrier
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
              {['No signup fee', 'Verified carriers', 'Real-time tracking', '24/7 support'].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle size={14} className="text-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map(stat => (
              <div key={stat.label} className="bg-white/8 border border-white/12 rounded-xl p-5">
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-sm text-slate-400 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">How Sumiko Works</h2>
            <p className="mt-4 text-lg text-slate-500">Simple, fast, and built for Africa's roads.</p>
          </div>

          {/* Tab toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-slate-100 rounded-xl p-1 inline-flex">
              <button
                onClick={() => setActiveTab('shipper')}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'shipper'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                For Shippers
              </button>
              <button
                onClick={() => setActiveTab('carrier')}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'carrier'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                For Carriers
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
            {(activeTab === 'shipper' ? HOW_SHIPPER : HOW_CARRIER).map((item, i) => (
              <div key={i} className="relative">
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px border-t-2 border-dashed border-slate-200 z-0 -translate-x-4" />
                )}
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-black text-lg mb-5">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to={activeTab === 'shipper' ? '/register' : '/login'}
              className="inline-flex items-center gap-2 bg-[#0A0F1E] hover:bg-[#141C2E] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              {activeTab === 'shipper' ? 'Post Your First Load' : 'Start Earning Today'}
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Built for Serious Freight</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              Every feature is designed to solve real challenges that freight businesses in southern Africa face every day.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 card-hover">
                <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-5`}>
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Trusted by African Businesses</h2>
            <p className="mt-4 text-lg text-slate-500">Real results from real companies on our network.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed text-sm italic mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                    <p className="text-xs text-slate-400">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section id="coverage" className="py-24 bg-[#0A0F1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6">
                <Globe size={14} className="text-orange-400" />
                <span className="text-orange-400 text-sm font-medium">Our Coverage</span>
              </div>
              <h2 className="text-4xl font-black text-white tracking-tight leading-tight">
                Cross-Border Freight,<br />
                <span className="text-gradient">Made Simple.</span>
              </h2>
              <p className="mt-6 text-slate-300 text-lg leading-relaxed">
                Sumiko operates across Zimbabwe and South Africa, handling the complex documentation,
                border procedures, and compliance requirements so you don't have to.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { flag: '🇿🇼', country: 'Zimbabwe', cities: 'Harare, Bulawayo, Mutare, Gweru, Masvingo' },
                  { flag: '🇿🇦', country: 'South Africa', cities: 'Johannesburg, Cape Town, Durban, Pretoria' },
                ].map(loc => (
                  <div key={loc.country} className="bg-white/8 border border-white/12 rounded-xl p-4">
                    <div className="text-2xl mb-2">{loc.flag}</div>
                    <div className="text-white font-bold text-base">{loc.country}</div>
                    <div className="text-slate-400 text-xs mt-1 leading-relaxed">{loc.cities}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle size={14} className="text-emerald-400" />
                  ZIMRA compliant documentation
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle size={14} className="text-emerald-400" />
                  Beit Bridge border expertise
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle size={14} className="text-emerald-400" />
                  USD & ZAR payments
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="relative mx-auto w-48 h-48">
                    {/* ZW dot */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2">
                      <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse" />
                      <div className="absolute inset-0 w-4 h-4 bg-orange-500 rounded-full animate-ping opacity-30" />
                      <div className="mt-2 text-xs text-white font-medium whitespace-nowrap">🇿🇼 Zimbabwe</div>
                    </div>
                    {/* SA dot */}
                    <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-x-4 translate-y-4">
                      <div className="w-4 h-4 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <div className="mt-2 text-xs text-white font-medium whitespace-nowrap">🇿🇦 South Africa</div>
                    </div>
                    {/* Connecting line */}
                    <div className="absolute top-1/2 left-1/2 w-px h-16 bg-gradient-to-b from-orange-500 to-orange-400 -translate-x-1/2" />
                  </div>
                  <p className="mt-8 text-slate-400 text-sm">+3 countries launching 2025</p>
                  <p className="text-xs text-slate-600 mt-1">Mozambique • Zambia • Botswana</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Move Smarter?
          </h2>
          <p className="mt-5 text-lg text-orange-100 max-w-xl mx-auto">
            Join thousands of businesses across Zimbabwe and South Africa who trust Sumiko to keep their supply chains moving.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="bg-white hover:bg-orange-50 text-orange-600 font-bold px-8 py-4 rounded-xl text-base transition-colors shadow-lg"
            >
              Start Shipping — It's Free
            </Link>
            <a
              href="tel:+2637780000001"
              className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors"
            >
              <Phone size={18} />
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0F1E] text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Truck size={16} className="text-white" strokeWidth={2.5} />
                </div>
                <span className="text-white font-bold text-lg">Sumiko</span>
              </div>
              <p className="text-sm leading-relaxed">
                Africa's premier digital freight platform. Moving goods. Building futures.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                {['For Shippers', 'For Carriers', 'Fleet Management', 'Admin Tools'].map(l => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                {['About Us', 'Careers', 'Press', 'Blog'].map(l => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>📍 8 Samora Machel Ave, Harare</li>
                <li>📍 14 Rissik St, Johannesburg</li>
                <li>📧 hello@sumiko.com</li>
                <li>📞 +263 77 800 0001</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs">© 2024 Sumiko. All rights reserved. Registered in Zimbabwe.</p>
            <div className="flex gap-6 text-xs">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
