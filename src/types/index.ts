export type UserRole = 'shipper' | 'carrier' | 'fleet_manager' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  phone?: string;
  avatar?: string;
  rating?: number;
  verified: boolean;
  joinedAt: string;
  city?: string;
  country?: string;
}

export type LoadStatus = 'posted' | 'assigned' | 'in_transit' | 'delivered' | 'cancelled';

export interface LoadLocation {
  address: string;
  city: string;
  province: string;
  country: string;
}

export interface Load {
  id: string;
  status: LoadStatus;
  shipperId: string;
  shipperName: string;
  shipperCompany: string;
  carrierId?: string;
  carrierName?: string;
  origin: LoadLocation;
  destination: LoadLocation;
  cargoType: string;
  cargoWeight: number;
  cargoDescription: string;
  price: number;
  currency: 'USD' | 'ZAR';
  distance: number;
  pickupDate: string;
  deliveryDate: string;
  createdAt: string;
  hazardous: boolean;
  refrigerated: boolean;
  truckType: string;
  truckId?: string;
  truckPlate?: string;
}

export type TruckStatus = 'available' | 'on_job' | 'maintenance' | 'offline';

export interface Truck {
  id: string;
  plateNumber: string;
  make: string;
  model: string;
  year: number;
  type: string;
  capacityTons: number;
  status: TruckStatus;
  driverId?: string;
  driverName?: string;
  currentLocation: string;
  lastService: string;
  mileage: number;
  ownerId: string;
}

export type DriverStatus = 'available' | 'on_job' | 'offline';

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  licenseNumber: string;
  licenseExpiry: string;
  rating: number;
  totalTrips: number;
  status: DriverStatus;
  truckId?: string;
  truckPlate?: string;
  joinedAt: string;
  city: string;
  ownerId: string;
}

export interface EarningsData {
  week: string;
  amount: number;
}

export interface MonthlyData {
  month: string;
  amount: number;
  loads?: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}
