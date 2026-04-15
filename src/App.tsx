import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import DashboardLayout from './components/layout/DashboardLayout';
import ShipperDashboard from './pages/shipper/ShipperDashboard';
import PostLoad from './pages/shipper/PostLoad';
import MyLoads from './pages/shipper/MyLoads';
import Tracking from './pages/shipper/Tracking';
import CarrierDashboard from './pages/carrier/CarrierDashboard';
import AvailableLoads from './pages/carrier/AvailableLoads';
import MyJobs from './pages/carrier/MyJobs';
import Earnings from './pages/carrier/Earnings';
import FleetDashboard from './pages/fleet/FleetDashboard';
import Trucks from './pages/fleet/Trucks';
import Drivers from './pages/fleet/Drivers';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminLoads from './pages/admin/AdminLoads';
import AdminAnalytics from './pages/admin/AdminAnalytics';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/shipper" element={<DashboardLayout role="shipper" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ShipperDashboard />} />
          <Route path="post-load" element={<PostLoad />} />
          <Route path="loads" element={<MyLoads />} />
          <Route path="tracking" element={<Tracking />} />
        </Route>

        <Route path="/carrier" element={<DashboardLayout role="carrier" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<CarrierDashboard />} />
          <Route path="available" element={<AvailableLoads />} />
          <Route path="jobs" element={<MyJobs />} />
          <Route path="earnings" element={<Earnings />} />
        </Route>

        <Route path="/fleet" element={<DashboardLayout role="fleet_manager" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<FleetDashboard />} />
          <Route path="trucks" element={<Trucks />} />
          <Route path="drivers" element={<Drivers />} />
        </Route>

        <Route path="/admin" element={<DashboardLayout role="admin" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="loads" element={<AdminLoads />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
