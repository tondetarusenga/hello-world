import { useState } from 'react';
import { MapPin, Truck, Clock, CheckCircle, Navigation, Phone, Package, ArrowRight } from 'lucide-react';
import { MOCK_LOADS } from '../../data/mock';
import { LoadStatusBadge } from '../../components/ui/Badge';
import Card from '../../components/ui/Card';

const ACTIVE_LOADS = MOCK_LOADS.filter(l => l.shipperId === 'u1' && (l.status === 'in_transit' || l.status === 'assigned'));

const TRACKING_EVENTS = [
  { time: '09:41 AM', event: 'Package picked up from origin', location: 'Harare, Zimbabwe', done: true },
  { time: '11:20 AM', event: 'Departed Harare Industrial', location: 'Harare, Zimbabwe', done: true },
  { time: '03:15 PM', event: 'Checkpoint — Beitbridge Border', location: 'Beitbridge, Zimbabwe', done: true },
  { time: '05:30 PM', event: 'Customs clearance complete', location: 'Beitbridge / Musina', done: true },
  { time: 'In progress', event: 'En route to Johannesburg', location: 'Musina, South Africa', done: false },
  { time: 'ETA: Tomorrow', event: 'Expected delivery', location: 'Johannesburg, Gauteng', done: false },
];

export default function Tracking() {
  const [selectedLoad, setSelectedLoad] = useState(ACTIVE_LOADS[0]?.id || null);
  const load = ACTIVE_LOADS.find(l => l.id === selectedLoad);

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Live Tracking</h1>
        <p className="text-sm text-slate-400 mt-1">Real-time visibility on your active shipments</p>
      </div>

      {ACTIVE_LOADS.length === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Package size={48} className="mx-auto mb-4 text-slate-200" />
            <h3 className="text-lg font-bold text-slate-600">No Active Shipments</h3>
            <p className="text-slate-400 text-sm mt-1">You have no loads currently in transit.</p>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Load selector */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Active Shipments</h3>
            {ACTIVE_LOADS.map(l => (
              <button
                key={l.id}
                onClick={() => setSelectedLoad(l.id)}
                className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                  selectedLoad === l.id
                    ? 'border-orange-400 bg-orange-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-bold text-orange-600">{l.id}</span>
                  <LoadStatusBadge status={l.status} />
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                  {l.origin.city}
                  <ArrowRight size={12} className="text-slate-400" />
                  {l.destination.city}
                </div>
                <div className="mt-1.5 text-xs text-slate-500">{l.cargoType} · {l.cargoWeight}T</div>
              </button>
            ))}
          </div>

          {/* Main tracking view */}
          {load && (
            <div className="lg:col-span-2 space-y-4">
              {/* Map placeholder */}
              <Card padding="none" className="overflow-hidden">
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-64 flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.15'%3E%3Cpath d='M0 0h40v1H0zM0 40h40v-1H0zM0 0v40H1V0zM40 0v40h-1V0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Route line animation */}
                  <div className="relative w-80 h-32">
                    {/* Origin */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 text-center">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full mx-auto mb-1" />
                      <div className="w-px h-6 bg-emerald-400 mx-auto" />
                      <p className="text-xs font-bold text-slate-700 mt-1 whitespace-nowrap">{load.origin.city}</p>
                    </div>

                    {/* Dotted route */}
                    <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-slate-400" />

                    {/* Truck position */}
                    <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '58%' }}>
                      <div className="bg-orange-500 text-white p-2 rounded-full shadow-lg animate-pulse">
                        <Truck size={16} />
                      </div>
                      <div className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full mt-1 whitespace-nowrap font-semibold">
                        {load.truckPlate || 'ABD 2341 ZW'}
                      </div>
                    </div>

                    {/* Destination */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-center">
                      <div className="w-3 h-3 bg-slate-400 rounded-full mx-auto mb-1" />
                      <div className="w-px h-6 bg-slate-300 mx-auto" />
                      <p className="text-xs font-bold text-slate-700 mt-1 whitespace-nowrap">{load.destination.city}</p>
                    </div>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-white rounded-lg px-3 py-1.5 shadow-sm">
                    <p className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      <Navigation size={11} className="text-orange-500" />
                      {load.distance} km total route
                    </p>
                  </div>
                </div>

                {/* Load info bar */}
                <div className="p-4 grid grid-cols-3 gap-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-400">Load ID</p>
                    <p className="text-sm font-bold text-orange-600 mt-0.5">{load.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Carrier</p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">{load.carrierName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">ETA</p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">{load.deliveryDate}</p>
                  </div>
                </div>
              </Card>

              {/* Shipment details + tracking timeline */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Carrier card */}
                <Card padding="lg">
                  <h4 className="text-sm font-bold text-slate-700 mb-4">Carrier Details</h4>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-base font-bold">
                      {load.carrierName?.[0] || 'C'}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{load.carrierName}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-amber-400 text-xs">★ 4.9</span>
                        <span className="text-slate-400 text-xs">· 312 trips</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                      <Truck size={14} className="text-slate-400" />
                      {load.truckPlate || 'ABD 2341 ZW'} · {load.truckType}
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                      <Clock size={14} className="text-slate-400" />
                      Pickup: {load.pickupDate}
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                      <MapPin size={14} className="text-slate-400" />
                      Currently: Musina, South Africa
                    </div>
                  </div>
                  <button className="mt-4 w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold py-2.5 rounded-lg transition-colors">
                    <Phone size={14} />
                    Contact Carrier
                  </button>
                </Card>

                {/* Timeline */}
                <Card padding="lg">
                  <h4 className="text-sm font-bold text-slate-700 mb-4">Tracking Timeline</h4>
                  <div className="space-y-3">
                    {TRACKING_EVENTS.map((event, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            event.done ? 'bg-emerald-500' : i === 4 ? 'bg-orange-500 ring-4 ring-orange-100' : 'bg-slate-200'
                          }`}>
                            {event.done ? (
                              <CheckCircle size={12} className="text-white" />
                            ) : i === 4 ? (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            ) : null}
                          </div>
                          {i < TRACKING_EVENTS.length - 1 && (
                            <div className={`w-px flex-1 mt-1 ${event.done ? 'bg-emerald-300' : 'bg-slate-200'}`} style={{ minHeight: '20px' }} />
                          )}
                        </div>
                        <div className="pb-3">
                          <p className={`text-xs font-semibold ${event.done ? 'text-slate-800' : i === 4 ? 'text-orange-600' : 'text-slate-400'}`}>
                            {event.event}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">{event.location}</p>
                          <p className={`text-xs mt-0.5 font-medium ${event.done ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {event.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
