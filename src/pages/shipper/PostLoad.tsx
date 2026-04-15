import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Package, Calendar, Truck, CheckCircle, ChevronRight, ChevronLeft, AlertTriangle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input, { Select } from '../../components/ui/Input';

const STEPS = [
  { id: 1, title: 'Route', icon: <MapPin size={16} /> },
  { id: 2, title: 'Cargo', icon: <Package size={16} /> },
  { id: 3, title: 'Schedule', icon: <Calendar size={16} /> },
  { id: 4, title: 'Confirm', icon: <CheckCircle size={16} /> },
];

const ZW_CITIES = [
  { value: '', label: 'Select city...' },
  { value: 'Harare', label: 'Harare, Zimbabwe' },
  { value: 'Bulawayo', label: 'Bulawayo, Zimbabwe' },
  { value: 'Mutare', label: 'Mutare, Zimbabwe' },
  { value: 'Gweru', label: 'Gweru, Zimbabwe' },
  { value: 'Masvingo', label: 'Masvingo, Zimbabwe' },
  { value: 'Kwekwe', label: 'Kwekwe, Zimbabwe' },
  { value: 'Beitbridge', label: 'Beitbridge, Zimbabwe' },
];

const SA_CITIES = [
  { value: 'Johannesburg', label: 'Johannesburg, South Africa' },
  { value: 'Cape Town', label: 'Cape Town, South Africa' },
  { value: 'Durban', label: 'Durban, South Africa' },
  { value: 'Pretoria', label: 'Pretoria, South Africa' },
  { value: 'Bloemfontein', label: 'Bloemfontein, South Africa' },
  { value: 'Musina', label: 'Musina, South Africa' },
  { value: 'Port Elizabeth', label: 'Port Elizabeth, South Africa' },
];

const ALL_CITIES = [
  { value: '', label: 'Select city...' },
  ...ZW_CITIES.slice(1),
  ...SA_CITIES,
];

const CARGO_TYPES = [
  { value: '', label: 'Select cargo type...' },
  { value: 'Consumer Goods', label: 'Consumer Goods / FMCG' },
  { value: 'Agricultural Produce', label: 'Agricultural Produce' },
  { value: 'Mining Equipment', label: 'Mining Equipment' },
  { value: 'Construction Materials', label: 'Construction Materials' },
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Textiles', label: 'Textiles & Clothing' },
  { value: 'Fresh Produce', label: 'Fresh Produce (Refrigerated)' },
  { value: 'Industrial Parts', label: 'Industrial Parts & Machinery' },
  { value: 'Pharmaceuticals', label: 'Pharmaceuticals' },
  { value: 'Fuel', label: 'Fuel / Petroleum Products' },
  { value: 'Other', label: 'Other' },
];

const TRUCK_TYPES = [
  { value: '', label: 'Select truck type...' },
  { value: '10-Ton Closed Body', label: '10-Ton Closed Body' },
  { value: '12-Ton Curtainsider', label: '12-Ton Curtainsider' },
  { value: '15-Ton Refrigerated', label: '15-Ton Refrigerated' },
  { value: '16-Ton Closed Body', label: '16-Ton Closed Body' },
  { value: '20-Ton Flatbed', label: '20-Ton Flatbed' },
  { value: '20-Ton Closed Body', label: '20-Ton Closed Body' },
  { value: '30-Ton Lowbed', label: '30-Ton Lowbed (Heavy)' },
  { value: '30-Ton Side-Tipper', label: '30-Ton Side-Tipper' },
  { value: '34-Ton Flatbed', label: '34-Ton Flatbed' },
  { value: '34-Ton Tipper', label: '34-Ton Tipper' },
];

interface FormData {
  originCity: string;
  originAddress: string;
  destCity: string;
  destAddress: string;
  cargoType: string;
  cargoWeight: string;
  cargoDescription: string;
  hazardous: boolean;
  refrigerated: boolean;
  truckType: string;
  pickupDate: string;
  deliveryDate: string;
  currency: string;
  budget: string;
}

const defaultForm: FormData = {
  originCity: '',
  originAddress: '',
  destCity: '',
  destAddress: '',
  cargoType: '',
  cargoWeight: '',
  cargoDescription: '',
  hazardous: false,
  refrigerated: false,
  truckType: '',
  pickupDate: '',
  deliveryDate: '',
  currency: 'USD',
  budget: '',
};

export default function PostLoad() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof FormData, value: string | boolean) =>
    setForm(f => ({ ...f, [key]: value }));

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => navigate('/shipper/loads'), 2000);
  };

  if (submitted) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-sm animate-slide-up">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Load Posted!</h2>
          <p className="text-slate-500 mt-2">Your load has been published. Carriers are already being notified.</p>
          <p className="text-sm text-slate-400 mt-4">Redirecting to My Loads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900">Post a Load</h1>
        <p className="text-slate-500 mt-1 text-sm">Fill in the details and we'll match you with verified carriers instantly.</p>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide pb-1">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 flex-shrink-0">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              step === s.id
                ? 'bg-orange-500 text-white'
                : step > s.id
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-100 text-slate-400'
            }`}>
              {step > s.id ? <CheckCircle size={12} /> : s.icon}
              {s.title}
            </div>
            {i < STEPS.length - 1 && (
              <ChevronRight size={14} className={step > s.id ? 'text-emerald-400' : 'text-slate-300'} />
            )}
          </div>
        ))}
      </div>

      <Card padding="lg">
        {/* Step 1: Route */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-lg font-bold text-slate-900">Origin & Destination</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Select
                label="Origin City"
                options={ALL_CITIES}
                value={form.originCity}
                onChange={e => update('originCity', e.target.value)}
                required
              />
              <Select
                label="Destination City"
                options={ALL_CITIES}
                value={form.destCity}
                onChange={e => update('destCity', e.target.value)}
                required
              />
            </div>
            <Input
              label="Pickup Address"
              placeholder="e.g. 14 Samora Machel Ave, Industrial Zone"
              value={form.originAddress}
              onChange={e => update('originAddress', e.target.value)}
              required
            />
            <Input
              label="Delivery Address"
              placeholder="e.g. 32 Commissioner St, Johannesburg CBD"
              value={form.destAddress}
              onChange={e => update('destAddress', e.target.value)}
              required
            />
            {form.originCity && form.destCity && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <MapPin size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-800">{form.originCity} → {form.destCity}</p>
                  <p className="text-xs text-blue-600 mt-0.5">Estimated distance will be calculated automatically</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Cargo */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-lg font-bold text-slate-900">Cargo Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Select
                label="Cargo Type"
                options={CARGO_TYPES}
                value={form.cargoType}
                onChange={e => update('cargoType', e.target.value)}
                required
              />
              <Input
                label="Cargo Weight (tons)"
                type="number"
                placeholder="e.g. 18"
                value={form.cargoWeight}
                onChange={e => update('cargoWeight', e.target.value)}
                min="0.1"
                step="0.1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Cargo Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                placeholder="Describe the cargo in detail (e.g. packaged goods, hazardous materials, special handling requirements...)"
                value={form.cargoDescription}
                onChange={e => update('cargoDescription', e.target.value)}
                rows={3}
                className="block w-full rounded-lg border border-slate-300 bg-white text-slate-900 text-sm placeholder-slate-400 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              />
            </div>
            <Select
              label="Required Truck Type"
              options={TRUCK_TYPES}
              value={form.truckType}
              onChange={e => update('truckType', e.target.value)}
              required
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                form.hazardous ? 'border-amber-400 bg-amber-50' : 'border-slate-200 hover:border-slate-300'
              }`}>
                <input
                  type="checkbox"
                  checked={form.hazardous}
                  onChange={e => update('hazardous', e.target.checked)}
                  className="accent-amber-500 w-4 h-4"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={14} className="text-amber-500" />
                    <span className="text-sm font-semibold text-slate-700">Hazardous Material</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">ADR compliance required</p>
                </div>
              </label>
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                form.refrigerated ? 'border-blue-400 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
              }`}>
                <input
                  type="checkbox"
                  checked={form.refrigerated}
                  onChange={e => update('refrigerated', e.target.checked)}
                  className="accent-blue-500 w-4 h-4"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-700">Temperature Controlled</div>
                  <p className="text-xs text-slate-400 mt-0.5">Requires refrigerated truck</p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Step 3: Schedule & Budget */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-lg font-bold text-slate-900">Schedule & Budget</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Pickup Date"
                type="date"
                value={form.pickupDate}
                onChange={e => update('pickupDate', e.target.value)}
                required
              />
              <Input
                label="Required Delivery Date"
                type="date"
                value={form.deliveryDate}
                onChange={e => update('deliveryDate', e.target.value)}
                required
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Select
                label="Payment Currency"
                options={[{ value: 'USD', label: 'USD — US Dollar' }, { value: 'ZAR', label: 'ZAR — South African Rand' }]}
                value={form.currency}
                onChange={e => update('currency', e.target.value)}
              />
              <Input
                label={`Your Budget (${form.currency})`}
                type="number"
                placeholder="e.g. 2500"
                value={form.budget}
                onChange={e => update('budget', e.target.value)}
                hint="Carriers will see this as a reference price"
              />
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-emerald-800">Market Rate Estimate</p>
              <p className="text-xs text-emerald-600 mt-1">
                Based on similar loads on this route, carriers typically quote{' '}
                <strong>$1,800 – $2,800 USD</strong> for this cargo type and distance.
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-lg font-bold text-slate-900">Review & Confirm</h2>
            <div className="space-y-3">
              {[
                { label: 'Route', value: `${form.originCity || '—'} → ${form.destCity || '—'}` },
                { label: 'Pickup Address', value: form.originAddress || '—' },
                { label: 'Delivery Address', value: form.destAddress || '—' },
                { label: 'Cargo Type', value: form.cargoType || '—' },
                { label: 'Weight', value: form.cargoWeight ? `${form.cargoWeight} tons` : '—' },
                { label: 'Truck Type', value: form.truckType || '—' },
                { label: 'Pickup Date', value: form.pickupDate || '—' },
                { label: 'Delivery Date', value: form.deliveryDate || '—' },
                { label: 'Budget', value: form.budget ? `${form.currency} ${Number(form.budget).toLocaleString()}` : '—' },
              ].map(row => (
                <div key={row.label} className="flex justify-between items-start py-2.5 border-b border-slate-100 last:border-0">
                  <span className="text-sm text-slate-500 flex-shrink-0">{row.label}</span>
                  <span className="text-sm font-semibold text-slate-900 text-right ml-4">{row.value}</span>
                </div>
              ))}
              {(form.hazardous || form.refrigerated) && (
                <div className="flex gap-2 flex-wrap">
                  {form.hazardous && <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full font-medium">⚠ Hazardous</span>}
                  {form.refrigerated && <span className="text-xs bg-blue-100 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full font-medium">❄ Refrigerated</span>}
                </div>
              )}
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-orange-800">What happens next?</p>
              <p className="text-xs text-orange-700 mt-1">
                Your load will be published immediately. Matched carriers will receive instant notifications and can submit quotes.
                You'll be notified as soon as the first carrier responds — typically within 15 minutes.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(s => s - 1)}>
              <ChevronLeft size={16} />
              Back
            </Button>
          ) : (
            <div />
          )}
          {step < 4 ? (
            <Button onClick={() => setStep(s => s + 1)}>
              Next Step
              <ChevronRight size={16} />
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              <CheckCircle size={16} />
              Post Load Now
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
