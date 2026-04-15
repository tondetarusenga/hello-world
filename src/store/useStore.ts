import { create } from 'zustand';
import { User, UserRole } from '../types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  sidebarOpen: boolean;
  login: (user: User) => void;
  logout: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  sidebarOpen: true,

  login: (user: User) => set({ user, isAuthenticated: true }),

  logout: () => set({ user: null, isAuthenticated: false }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
}));

export const DEMO_USERS: Record<UserRole, User> = {
  shipper: {
    id: 'u1',
    name: 'Tendai Moyo',
    email: 'tendai@moyotrading.co.zw',
    role: 'shipper',
    company: 'Moyo Trading Ltd',
    phone: '+263 77 234 5678',
    verified: true,
    joinedAt: '2023-03-15',
    city: 'Harare',
    country: 'Zimbabwe',
    rating: 4.8,
  },
  carrier: {
    id: 'u2',
    name: 'Chisomo Banda',
    email: 'chisomo@bandatransport.co.zw',
    role: 'carrier',
    company: 'Banda Transport',
    phone: '+263 71 456 7890',
    verified: true,
    joinedAt: '2023-01-10',
    city: 'Bulawayo',
    country: 'Zimbabwe',
    rating: 4.9,
  },
  fleet_manager: {
    id: 'u3',
    name: 'Sibongile Dube',
    email: 'sibongile@dubetransport.co.zw',
    role: 'fleet_manager',
    company: 'Dube Transport (Pvt) Ltd',
    phone: '+263 73 567 8901',
    verified: true,
    joinedAt: '2022-11-05',
    city: 'Bulawayo',
    country: 'Zimbabwe',
    rating: 4.7,
  },
  admin: {
    id: 'u4',
    name: 'Rudo Matsika',
    email: 'rudo@sumiko.com',
    role: 'admin',
    company: 'Sumiko',
    phone: '+263 77 800 0001',
    verified: true,
    joinedAt: '2022-08-01',
    city: 'Harare',
    country: 'Zimbabwe',
  },
};
