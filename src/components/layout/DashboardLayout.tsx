import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Package, MapPin, FileText, Settings, Search,
  Bell, ChevronDown, Truck, Users, BarChart2, DollarSign,
  Briefcase, Menu, X, LogOut, User, TrendingUp, CreditCard,
  MessageSquare, Shield, Plus
} from 'lucide-react';
import clsx from 'clsx';
import { useStore, DEMO_USERS } from '../../store/useStore';
import { UserRole } from '../../types';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

function getNavItems(role: UserRole): NavItem[] {
  switch (role) {
    case 'shipper':
      return [
        { label: 'Dashboard', path: '/shipper/dashboard', icon: <LayoutDashboard size={18} /> },
        { label: 'Post a Load', path: '/shipper/post-load', icon: <Plus size={18} /> },
        { label: 'My Loads', path: '/shipper/loads', icon: <Package size={18} /> },
        { label: 'Live Tracking', path: '/shipper/tracking', icon: <MapPin size={18} /> },
        { label: 'Invoices', path: '#', icon: <FileText size={18} /> },
        { label: 'Settings', path: '#', icon: <Settings size={18} /> },
      ];
    case 'carrier':
      return [
        { label: 'Dashboard', path: '/carrier/dashboard', icon: <LayoutDashboard size={18} /> },
        { label: 'Find Loads', path: '/carrier/available', icon: <Search size={18} /> },
        { label: 'My Jobs', path: '/carrier/jobs', icon: <Briefcase size={18} /> },
        { label: 'Earnings', path: '/carrier/earnings', icon: <DollarSign size={18} /> },
        { label: 'Profile', path: '#', icon: <User size={18} /> },
        { label: 'Settings', path: '#', icon: <Settings size={18} /> },
      ];
    case 'fleet_manager':
      return [
        { label: 'Dashboard', path: '/fleet/dashboard', icon: <LayoutDashboard size={18} /> },
        { label: 'My Fleet', path: '/fleet/trucks', icon: <Truck size={18} /> },
        { label: 'Drivers', path: '/fleet/drivers', icon: <Users size={18} /> },
        { label: 'Performance', path: '#', icon: <TrendingUp size={18} /> },
        { label: 'Reports', path: '#', icon: <FileText size={18} /> },
        { label: 'Settings', path: '#', icon: <Settings size={18} /> },
      ];
    case 'admin':
      return [
        { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
        { label: 'All Loads', path: '/admin/loads', icon: <Package size={18} /> },
        { label: 'Users', path: '/admin/users', icon: <Users size={18} /> },
        { label: 'Analytics', path: '/admin/analytics', icon: <BarChart2 size={18} /> },
        { label: 'Payments', path: '#', icon: <CreditCard size={18} /> },
        { label: 'Support', path: '#', icon: <MessageSquare size={18} /> },
        { label: 'Security', path: '#', icon: <Shield size={18} /> },
        { label: 'Settings', path: '#', icon: <Settings size={18} /> },
      ];
  }
}

function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    shipper: 'Shipper',
    carrier: 'Carrier',
    fleet_manager: 'Fleet Manager',
    admin: 'Admin',
  };
  return labels[role];
}

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

interface DashboardLayoutProps {
  role: UserRole;
}

export default function DashboardLayout({ role }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const { user, login, logout, sidebarOpen, setSidebarOpen } = useStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Auto-login demo user for this role if not logged in
  useEffect(() => {
    if (!user || user.role !== role) {
      login(DEMO_USERS[role]);
    }
  }, [role, user, login]);

  const navItems = getNavItems(role);
  const currentUser = user || DEMO_USERS[role];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed lg:static inset-y-0 left-0 z-30 flex flex-col w-64 flex-shrink-0 transition-transform duration-300 ease-in-out',
          'scrollbar-thin overflow-y-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
        style={{ background: '#0A0F1E' }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Truck size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Sumiko</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white p-1 rounded"
          >
            <X size={18} />
          </button>
        </div>

        {/* Role badge */}
        <div className="px-5 py-3 border-b border-white/10">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
            {getRoleLabel(role)} Portal
          </span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-orange-500/15 text-orange-400'
                    : 'text-slate-400 hover:bg-white/8 hover:text-white',
                )
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom User Section */}
        <div className="flex-shrink-0 border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {getInitials(currentUser.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
              <p className="text-xs text-slate-400 truncate">{currentUser.company || currentUser.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-3 flex items-center gap-2 text-xs text-slate-500 hover:text-rose-400 transition-colors w-full px-1 py-1 rounded"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 lg:px-6 gap-4 flex-shrink-0 z-10">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600"
          >
            <Menu size={20} />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search loads, carriers..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-1 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 animate-fade-in">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <h4 className="text-sm font-semibold text-slate-900">Notifications</h4>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {[
                      { title: 'Load L-2024-001 is in transit', time: '2 min ago', type: 'info' },
                      { title: 'Payment confirmed for L-2024-002', time: '1 hour ago', type: 'success' },
                      { title: 'New bid received on L-2024-003', time: '3 hours ago', type: 'warning' },
                    ].map((n, i) => (
                      <div key={i} className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors">
                        <p className="text-sm text-slate-800 font-medium">{n.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-slate-100">
                    <button className="text-xs text-orange-600 font-medium hover:text-orange-700">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* User avatar */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                  {getInitials(currentUser.name)}
                </div>
                <span className="text-sm font-medium text-slate-700 hidden sm:block">{currentUser.name.split(' ')[0]}</span>
                <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 z-50 animate-fade-in">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-900">{currentUser.name}</p>
                    <p className="text-xs text-slate-500">{currentUser.email}</p>
                  </div>
                  <div className="p-1.5">
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                      <User size={14} /> Profile
                    </button>
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                      <Settings size={14} /> Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <LogOut size={14} /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
