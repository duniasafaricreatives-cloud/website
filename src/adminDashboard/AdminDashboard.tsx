import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { authFetchs, API_BASE } from '../config';
import {
  Statistics,
  ActivityLog,
  AdminUser,
  Booking,
  Payment,
  TravelPackage,
  Affiliator,
} from '../interfaces/AdminInterfaces';
import Tabs from './Tabs';
import Overview from './Overview';
import Users from './Users';
import Affiliators from './Affiliators';
import Packages from './Packages';
import Bookings from './Bookings';
import Payments from './Payments';

import ActivityLogs from './ActivityLogs';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'affiliators' | 'packages' | 'bookings' | 'payments' | 'reviews' | 'coupons' | 'withdrawals' | 'logs'>('overview');
  const [loading, setLoading] = useState(false);
  
  // State
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [affiliators, setAffiliators] = useState<Affiliator[]>([]);
  

  const [showPackageForm, setShowPackageForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  

  const [packageForm, setPackageForm] = useState({
    name: '',
    description: '',
    price: '',
    specials: [] as string[],
    color: '#000000',
    duration_days: ''
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchStatistics(),
      fetchActivityLogs(),
      fetchUsers(),
      fetchBookings(),
      fetchPayments(),
      fetchPackages(),
      fetchAffiliators()
    ]);
  };

  const fetchStatistics = async () => {
    try {
      const data = await authFetchs(`${API_BASE}/admin/statistics`);
      setStatistics(data);
    } catch (err) {
      console.error('Failed to fetch statistics', err);
    }
  };

  const fetchActivityLogs = async () => {
    try {
      const data = await authFetchs(`${API_BASE}/admin/activity-logs`);
      setActivityLogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch activity logs', err);
      setActivityLogs([]);
    }
  };

  
  const fetchUsers = async () => {
    try {
      const data = await authFetchs(`${API_BASE}/admin/users`);
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch users', err);
      setUsers([]);
    }
  };

  const fetchBookings = async () => {
    try {
      const data = await authFetchs(`${API_BASE}/admin/bookings`);
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch bookings', err);
      setBookings([]);
    }
  };

  const fetchPayments = async () => {
    try {
      const data = await authFetchs(`${API_BASE}/admin/payments`);
      setPayments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch payments', err);
      setPayments([]);
    }
  };

  const fetchPackages = async () => {
    try {
      const data = await authFetchs(`${API_BASE}/admin/packages`);
      setPackages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch packages', err);
      setPackages([]);
    }
  };

  const fetchAffiliators = async () => {
    try {
      const data = await authFetchs(`${API_BASE}/admin/affiliators`);
      setAffiliators(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch affiliators', err);
      setAffiliators([]);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'completed':
      case 'confirmed':
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'rejected':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage your travel platform</p>
          </div>
          <button
            onClick={fetchAllData}
            className="flex items-center gap-2 px-4 py-2 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content */}
        {activeTab === 'overview' && <Overview statistics={statistics} />}
        {activeTab === 'users' && <Users users={users} formatDate={formatDate} />}
        {activeTab === 'affiliators' && <Affiliators affiliators={affiliators} formatDate={formatDate} />}
        {activeTab === 'packages' && (
          <Packages
            packages={packages}
            showPackageForm={showPackageForm}
            setShowPackageForm={setShowPackageForm}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            packageForm={packageForm}
            setPackageForm={setPackageForm}
            loading={loading}
            setLoading={setLoading}
            fetchPackages={fetchPackages}
            fetchStatistics={fetchStatistics}
          />
        )}
        {activeTab === 'bookings' && (
          <Bookings bookings={bookings} formatDate={formatDate} getStatusColor={getStatusColor} />
        )}
        {activeTab === 'payments' && (
          <Payments payments={payments} formatDate={formatDate} getStatusColor={getStatusColor} />
        )}
        {activeTab === 'logs' && (
          <ActivityLogs activityLogs={activityLogs} formatDate={formatDate} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;