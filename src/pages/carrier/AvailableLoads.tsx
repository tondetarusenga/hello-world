import { useState } from 'react';
import { Search, MapPin, ArrowRight, Filter, SlidersHorizontal } from 'lucide-react';
import { AVAILABLE_LOADS, MOCK_LOADS } from '../../data/mock';
import { Load } from '../../types';

const ALL_AVAILABLE = [...AVAILABLE_LOADS, ...MOCK_LOADS.filter(l => l.status === 'posted')];

const CARGO_FILTERS = ['All Types', 'Consumer Goods', 'Agricultural Produce', 'Mining Equipment', 'Construction Materials', 'Fresh Produce'];
const COUNTRY_FILTERS = ['All Routes', 'Zimbabwe Only', 'Cross-Border (ZW→SA)', 'South Africa Only'];

export default function AvailableLoads() {
  const [search, setSearch] = useState('');
  const [cargoFilter, setCargoFilter] = useState('All Types');
  const [countryFilter, setCountryFilter] = useState('All Routes');
  const [sortBy, setSortBy] = useState('price-desc');
  const [accepted, setAccepted] = useState<string | null>(null);

  const filtered = ALL_AVAILABLE.filter(l => {
    const q = search.toLowerCase();
    const matchSearch = !search || l.id.toLowerCase().includes(q) || l.origin.city.toLowerCase().includes(q) || l.destination.city.toLowerCase().includes(q) || l.cargoType.toLowerCase().includes(q);
    const matchCargo = cargoFilter === 'All Types' || l.cargoType === cargoFilter;
    return matchSearch && matchCargo;
  }).sort((a, b) => {
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'distance-asc') return a.distance - b.distance;
    return 0;
  });

  const handleAccept = (id: string) => {
    setAccepted(id);
    setTimeout(() => setAccepted(null), 3000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Find Loads</h1>
        <p className="text-sm text-slate-400 mt-1">{filtered.length} loads available · Matched to 30-ton trucks</p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by city, cargo type, or load ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer"
          >
            <option value="price-desc">Highest Paying</option>
            <option value="price-asc">Lowest Price</option>
            <option value="distance-asc">Shortest Route</option>
          </select>
        </div>
        <div className="flex gap-2 flex-wrap">
          {CARGO_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setCargoFilter(f)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                cargoFilter === f ? 'bg-orange-500 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Load cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
            <Filter size={40} className="mx-auto mb-3 text-slate-200" />
            <p className="text-slate-400 font-medium">No loads match your filters</p>
          </div>
        )}
        {filtered.map(load => (
          <LoadCard key={load.id} load={load} accepted={accepted === load.id} onAccept={() => handleAccept(load.id)} />
        ))}
      </div>
    </div>
  );
}

function LoadCard({ load, accepted, onAccept }: { load: Load; accepted: boolean; onAccept: () => void }) {
  const [expanded, setExpanded] = useState(false);

  if (accepted) {
    return (
      <div className="bg-emerald-50 border-2 border-emerald-400 rounded-xl p-5 flex items-center gap-4 animate-fade-in">
        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold">✓</span>
        </div>
        <div>
          <p className="font-bold text-emerald-800">Load Accepted!</p>
          <p className="text-sm text-emerald-600">You've accepted {load.id}. The shipper will be notified immediately.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl border-2 transition-all ${expanded ? 'border-orange-300 shadow-md' : 'border-slate-200 hover:border-slate-300'}`}>
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Header row */}
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-xs font-bold text-orange-600">{load.id}</span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{load.cargoType}</span>
              {load.refrigerated && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">❄ Refrigerated</span>}
              {load.hazardous && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">⚠ Hazardous</span>}
            </div>

            {/* Route */}
            <div className="flex items-center gap-2 text-base font-bold text-slate-900">
              <MapPin size={14} className="text-orange-500 flex-shrink-0" />
              {load.origin.city}, {load.origin.country === 'Zimbabwe' ? 'ZW' : 'SA'}
              <ArrowRight size={14} className="text-slate-400" />
              {load.destination.city}, {load.destination.country === 'Zimbabwe' ? 'ZW' : 'SA'}
            </div>

            {/* Details */}
            <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-500">
              <span>{load.distance.toLocaleString()} km</span>
              <span>·</span>
              <span>{load.cargoWeight} tons</span>
              <span>·</span>
              <span>{load.truckType}</span>
              <span>·</span>
              <span>Pickup: <strong className="text-slate-700">{load.pickupDate}</strong></span>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-right">
              <div className="text-2xl font-black text-slate-900">${load.price.toLocaleString()}</div>
              <div className="text-xs text-slate-400">{load.currency} · ~${Math.round(load.price / (load.distance / 100))} / 100km</div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={onAccept}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
              >
                Accept Load
              </button>
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-slate-500 hover:text-slate-700 transition-colors text-center"
              >
                {expanded ? 'Less details ▲' : 'More details ▼'}
              </button>
            </div>
          </div>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid sm:grid-cols-2 gap-4 animate-fade-in">
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cargo Details</h4>
              <div className="text-sm text-slate-700">{load.cargoDescription}</div>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pickup Location</h4>
              <div className="text-sm text-slate-700">{load.origin.address}</div>
              <div className="text-sm text-slate-500">{load.origin.city}, {load.origin.province}, {load.origin.country}</div>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Shipper</h4>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                  {load.shipperName[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{load.shipperName}</div>
                  <div className="text-xs text-slate-400">{load.shipperCompany}</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Delivery Info</h4>
              <div className="text-sm text-slate-700">{load.destination.address}</div>
              <div className="text-sm text-slate-500">Required by: {load.deliveryDate}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
