import { useState } from 'react';
import { Search, Shield, CheckCircle, XCircle, MoreVertical, Users } from 'lucide-react';
import { ALL_USERS } from '../../data/mock';
import { UserRole } from '../../types';
import Badge from '../../components/ui/Badge';

const ROLE_FILTERS: { label: string; value: UserRole | 'all' }[] = [
  { label: 'All Users', value: 'all' },
  { label: 'Shippers', value: 'shipper' },
  { label: 'Carriers', value: 'carrier' },
  { label: 'Fleet Managers', value: 'fleet_manager' },
  { label: 'Admins', value: 'admin' },
];

const ROLE_LABELS: Record<UserRole, string> = {
  shipper: 'Shipper',
  carrier: 'Carrier',
  fleet_manager: 'Fleet Manager',
  admin: 'Admin',
};

const ROLE_COLORS: Record<UserRole, 'orange' | 'info' | 'success' | 'purple'> = {
  shipper: 'orange',
  carrier: 'info',
  fleet_manager: 'success',
  admin: 'purple',
};

export default function AdminUsers() {
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [search, setSearch] = useState('');
  const [verifiedFilter, setVerifiedFilter] = useState<'all' | 'verified' | 'unverified'>('all');

  const filtered = ALL_USERS.filter(u => {
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    const q = search.toLowerCase();
    const matchSearch = !search || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.company || '').toLowerCase().includes(q);
    const matchVerified = verifiedFilter === 'all' || (verifiedFilter === 'verified' ? u.verified : !u.verified);
    return matchRole && matchSearch && matchVerified;
  });

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Users</h1>
          <p className="text-sm text-slate-400 mt-1">{ALL_USERS.length} registered users · {ALL_USERS.filter(u => u.verified).length} verified</p>
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl">
            <Users size={13} />
            {ALL_USERS.filter(u => !u.verified).length} pending verification
          </div>
        </div>
      </div>

      {/* Role summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { role: 'shipper' as UserRole, label: 'Shippers', count: ALL_USERS.filter(u => u.role === 'shipper').length, color: 'bg-orange-100 text-orange-800 border-orange-200' },
          { role: 'carrier' as UserRole, label: 'Carriers', count: ALL_USERS.filter(u => u.role === 'carrier').length, color: 'bg-blue-100 text-blue-800 border-blue-200' },
          { role: 'fleet_manager' as UserRole, label: 'Fleet Managers', count: ALL_USERS.filter(u => u.role === 'fleet_manager').length, color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
          { role: 'admin' as UserRole, label: 'Admins', count: ALL_USERS.filter(u => u.role === 'admin').length, color: 'bg-purple-100 text-purple-800 border-purple-200' },
        ].map(s => (
          <button
            key={s.role}
            onClick={() => setRoleFilter(roleFilter === s.role ? 'all' : s.role)}
            className={`rounded-xl p-4 border text-left transition-all ${s.color} ${roleFilter === s.role ? 'ring-2 ring-offset-1 ring-orange-400' : ''}`}
          >
            <div className="text-2xl font-black">{s.count}</div>
            <div className="text-xs font-semibold mt-0.5">{s.label}</div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {ROLE_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setRoleFilter(f.value)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                roleFilter === f.value ? 'bg-orange-500 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {f.label}
            </button>
          ))}
          <select
            value={verifiedFilter}
            onChange={e => setVerifiedFilter(e.target.value as 'all' | 'verified' | 'unverified')}
            className="px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer font-semibold text-slate-600"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">User</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Role</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Location</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Joined</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Rating</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-16">
                    <Users size={40} className="mx-auto mb-3 text-slate-200" />
                    <p className="text-slate-400 font-medium">No users found</p>
                  </td>
                </tr>
              )}
              {filtered.map(user => (
                <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{user.name}</div>
                        <div className="text-xs text-slate-400">{user.email}</div>
                        {user.company && <div className="text-xs text-slate-400">{user.company}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={ROLE_COLORS[user.role]}>{ROLE_LABELS[user.role]}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm text-slate-700">{user.city}</div>
                    <div className="text-xs text-slate-400">{user.country}</div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">{user.joinedAt}</td>
                  <td className="px-5 py-4">
                    {user.rating ? (
                      <span className="text-sm font-bold text-amber-500">★ {user.rating}</span>
                    ) : (
                      <span className="text-xs text-slate-300">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {user.verified ? (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                        <CheckCircle size={13} />
                        Verified
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600">
                        <Shield size={13} />
                        Pending
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <button className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <p className="text-xs text-slate-400">Showing {filtered.length} of {ALL_USERS.length} users</p>
          <button className="text-xs font-semibold text-orange-600 hover:text-orange-700">Export CSV</button>
        </div>
      </div>
    </div>
  );
}
