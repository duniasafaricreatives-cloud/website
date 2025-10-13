import React, { useState, useEffect } from "react";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Package,
  CreditCard,
  Star,
  RefreshCw,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Plus,
  Calendar,
  Activity,
  User,
  Tag
} from "lucide-react";
import { authFetchs, API_BASE } from "../config";

// Interfaces
interface Statistics {
  users: {
    total: number;
    verified: number;
    unverified: number;
  };
  affiliators: {
    total: number;
  };
  packages: {
    total: number;
    active: number;
    inactive: number;
  };
  bookings: {
    total: number;
    pending: number;
    confirmed: number;
  };
  payments: {
    total: number;
    total_revenue: number;
    total_commissions: number;
    net_revenue: number;
  };
  reviews: {
    total: number;
    pending: number;
  };
  withdrawals: {
    pending: number;
  };
}

interface ActivityLog {
  id: number;
  user_id: number;
  user_type: string;
  action: string;
  description: string;
  ip_address: string;
  created_at: string;
}

interface Withdrawal {
  id: number;
  affiliator_id: number;
  amount: number;
  status: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  created_at: string;
}

interface Coupon {
  id: number;
  code: string;
  discount_percentage: number;
  max_discount_amount: number;
  min_purchase_amount: number;
  usage_limit: number;
  used_count: number;
  is_active: boolean;
  expires_at: string;
}

interface Review {
  id: number;
  user_id: number;
  package_id: number;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  is_verified: boolean;
  created_at: string;
}

interface Booking {
  id: number;
  user_id: number;
  package_id: number;
  booking_status: string;
  booking_reference: string;
  participants: number;
  travel_date: string;
  created_at: string;
  package: {
    name: string;
  };
}

interface Payment {
  id: number;
  user_id: number;
  package_id: number;
  amount: number;
  affiliator_commission: number;
  payment_status: string;
  payment_reference: string;
  paystack_reference: string;
  created_at: string;
  package: {
    name: string;
  };
}

interface TravelPackage {
  id: number;
  name: string;
  description: string;
  price: number;
  specials: string[];
  color: string;
  duration_days: number;
  is_active: boolean;
  created_at: string;
}
interface Affiliator {
  id: number;
  name: string;
  email: string;
  affiliate_code: string;
  total_commission: number;
  withdrawn_commission: number;
  is_verified: boolean;
  created_at: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'affiliators' | 'packages' | 'bookings' | 'payments' | 'reviews' | 'coupons' | 'withdrawals' | 'logs'>('overview');
  const [loading, setLoading] = useState(false);
  
  // State
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [affiliators, setAffiliators] = useState<Affiliator[]>([]);
  
  // Modal states
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  // Forms
  const [couponForm, setCouponForm] = useState({
    code: '',
    discount_percentage: '',
    max_discount_amount: '',
    min_purchase_amount: '',
    usage_limit: '',
    expires_at: ''
  });
  
  const [packageForm, setPackageForm] = useState({
    name: '',
    description: '',
    price: '',
    discount_price: '',
    duration_days: '',
    destination: '',
    image_url: '',
    max_participants: ''
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchStatistics(),
      fetchActivityLogs(),
      fetchWithdrawals(),
      fetchCoupons(),
      fetchReviews(),
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

  const fetchWithdrawals = async () => {
    try {
      const data = await authFetchs(`${API_BASE}/admin/withdrawals`);
      setWithdrawals(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch withdrawals', err);
      setWithdrawals([]);
    }
  };

  const fetchCoupons = async () => {
    try {
      const data = await authFetchs(`${API_BASE}/admin/coupons`);
      setCoupons(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch coupons', err);
      setCoupons([]);
    }
  };

  const fetchReviews = async () => {
    try {
      const data = await authFetchs(`${API_BASE}/admin/reviews`);
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch reviews', err);
      setReviews([]);
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

  const handleWithdrawalAction = async (id: number, action: 'approve' | 'reject') => {
    try {
      setLoading(true);
      await authFetchs(`${API_BASE}/admin/withdrawals/${id}/${action}`, {
        method: 'PUT'
      });
      alert(`Withdrawal ${action}ed successfully!`);
      await fetchWithdrawals();
      await fetchStatistics();
    } catch (err: any) {
      alert(err.message || `Failed to ${action} withdrawal`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await authFetchs(`${API_BASE}/admin/coupons`, {
        method: 'POST',
        body: JSON.stringify({
          code: couponForm.code,
          discount_percentage: parseFloat(couponForm.discount_percentage),
          max_discount_amount: parseFloat(couponForm.max_discount_amount),
          min_purchase_amount: parseFloat(couponForm.min_purchase_amount),
          usage_limit: parseInt(couponForm.usage_limit),
          expires_at: couponForm.expires_at
        })
      });
      alert('Coupon created successfully!');
      setShowCouponForm(false);
      setCouponForm({ code: '', discount_percentage: '', max_discount_amount: '', min_purchase_amount: '', usage_limit: '', expires_at: '' });
      await fetchCoupons();
    } catch (err: any) {
      alert(err.message || 'Failed to create coupon');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCoupon = async (id: number) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return;
    try {
      await authFetchs(`${API_BASE}/admin/coupons/${id}`, { method: 'DELETE' });
      alert('Coupon deleted successfully!');
      await fetchCoupons();
    } catch (err: any) {
      alert(err.message || 'Failed to delete coupon');
    }
  };

  const handleReviewAction = async (id: number, action: 'approve' | 'delete') => {
    if (action === 'delete' && !confirm('Are you sure you want to delete this review?')) return;
    try {
      const method = action === 'approve' ? 'PUT' : 'DELETE';
      await authFetchs(`${API_BASE}/admin/reviews/${id}`, { method });
      alert(`Review ${action}d successfully!`);
      await fetchReviews();
      await fetchStatistics();
    } catch (err: any) {
      alert(err.message || `Failed to ${action} review`);
    }
  };

  const handleCreatePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem 
        ? `${API_BASE}/admin/packages/${editingItem.id}`
        : `${API_BASE}/admin/packages`;
      
      await authFetchs(url, {
        method,
        body: JSON.stringify({
          name: packageForm.name,
          description: packageForm.description,
          price: parseFloat(packageForm.price),
          discount_price: parseFloat(packageForm.discount_price),
          duration_days: parseInt(packageForm.duration_days),
          destination: packageForm.destination,
          image_url: packageForm.image_url,
          max_participants: parseInt(packageForm.max_participants)
        })
      });
      alert(`Package ${editingItem ? 'updated' : 'created'} successfully!`);
      setShowPackageForm(false);
      setEditingItem(null);
      setPackageForm({ name: '', description: '', price: '', discount_price: '', duration_days: '', destination: '', image_url: '', max_participants: '' });
      await fetchPackages();
    } catch (err: any) {
      alert(err.message || 'Failed to save package');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePackage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this package?')) return;
    try {
      await authFetchs(`${API_BASE}/admin/packages/${id}`, { method: 'DELETE' });
      alert('Package deleted successfully!');
      await fetchPackages();
      await fetchStatistics();
    } catch (err: any) {
      alert(err.message || 'Failed to delete package');
    }
  };

  const editPackage = (pkg: TravelPackage) => {
    setEditingItem(pkg);
    setPackageForm({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price.toString(),
      discount_price: pkg.discount_price.toString(),
      duration_days: pkg.duration_days.toString(),
      destination: pkg.destination,
      image_url: pkg.image_url,
      max_participants: pkg.max_participants.toString()
    });
    setShowPackageForm(true);
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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'affiliators', label: 'Affiliators', icon: User },
    { id: 'packages', label: 'Packages', icon: Package },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'coupons', label: 'Coupons', icon: Tag },
    { id: 'withdrawals', label: 'Withdrawals', icon: DollarSign },
    { id: 'logs', label: 'Activity Logs', icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your travel platform</p>
          </div>
          <button
            onClick={fetchAllData}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200 overflow-x-auto">
          <nav className="flex space-x-4 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap flex items-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && statistics && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{statistics.users.total}</p>
                <p className="text-sm text-gray-500 mt-2">{statistics.users.verified} verified</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${statistics.payments.total_revenue.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-2">Net: ${statistics.payments.net_revenue.toFixed(2)}</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{statistics.bookings.total}</p>
                <p className="text-sm text-gray-500 mt-2">{statistics.bookings.pending} pending</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Active Packages</p>
                <p className="text-3xl font-bold text-gray-900">{statistics.packages.active}</p>
                <p className="text-sm text-gray-500 mt-2">of {statistics.packages.total} total</p>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Actions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending Withdrawals</span>
                    <span className="font-semibold text-yellow-600">{statistics.withdrawals.pending}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending Reviews</span>
                    <span className="font-semibold text-yellow-600">{statistics.reviews.pending}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending Bookings</span>
                    <span className="font-semibold text-yellow-600">{statistics.bookings.pending}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Revenue</span>
                    <span className="font-semibold text-green-600">${statistics.payments.total_revenue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Commissions Paid</span>
                    <span className="font-semibold text-orange-600">${statistics.payments.total_commissions.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Net Revenue</span>
                    <span className="font-semibold text-blue-600">${statistics.payments.net_revenue.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Affiliators</span>
                    <span className="font-semibold text-gray-900">{statistics.affiliators.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Reviews</span>
                    <span className="font-semibold text-gray-900">{statistics.reviews.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Payments</span>
                    <span className="font-semibold text-gray-900">{statistics.payments.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">All Users</h2>
              <p className="text-sm text-gray-600 mt-1">Manage platform users</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="ml-3 text-sm font-medium text-gray-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.is_verified ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(user.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Affiliators Tab */}
        {activeTab === 'affiliators' && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Affiliators</h2>
              <p className="text-sm text-gray-600 mt-1">Manage affiliate partners</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Commission</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Withdrawn</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {affiliators.map((aff) => (
                    <tr key={aff.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{aff.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{aff.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">{aff.affiliate_code}</code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">${aff.total_commission.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">${aff.withdrawn_commission.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          aff.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {aff.is_verified ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Packages Tab */}
        {activeTab === 'packages' && (
          <div>
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Travel Packages</h2>
                  <p className="text-sm text-gray-600 mt-1">Manage travel packages</p>
                </div>
                {!showPackageForm && (
                  <button
                    onClick={() => setShowPackageForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Package
                  </button>
                )}
              </div>
              
              {showPackageForm && (
                <div className="p-6 bg-gray-50 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {editingItem ? 'Edit Package' : 'Create New Package'}
                  </h3>
                  <form onSubmit={handleCreatePackage} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Package Name</label>
                      <input
                        type="text"
                        value={packageForm.name}
                        onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                      <input
                        type="text"
                        value={packageForm.destination}
                        onChange={(e) => setPackageForm({ ...packageForm, destination: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={packageForm.description}
                        onChange={(e) => setPackageForm({ ...packageForm, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={packageForm.price}
                        onChange={(e) => setPackageForm({ ...packageForm, price: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Discount Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={packageForm.discount_price}
                        onChange={(e) => setPackageForm({ ...packageForm, discount_price: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Days)</label>
                      <input
                        type="number"
                        value={packageForm.duration_days}
                        onChange={(e) => setPackageForm({ ...packageForm, duration_days: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Participants</label>
                      <input
                        type="number"
                        value={packageForm.max_participants}
                        onChange={(e) => setPackageForm({ ...packageForm, max_participants: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                      <input
                        type="url"
                        value={packageForm.image_url}
                        onChange={(e) => setPackageForm({ ...packageForm, image_url: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2 flex gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : editingItem ? 'Update Package' : 'Create Package'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowPackageForm(false);
                          setEditingItem(null);
                          setPackageForm({ name: '', description: '', price: '', discount_price: '', duration_days: '', destination: '', image_url: '', max_participants: '' });
                        }}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {packages.map((pkg) => (
                      <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img src={pkg.image_url} alt={pkg.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{pkg.name}</p>
                              <p className="text-xs text-gray-500">{pkg.total_reviews} reviews</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pkg.destination}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            <p className="font-semibold text-gray-900">${pkg.discount_price.toFixed(2)}</p>
                            <p className="text-xs text-gray-500 line-through">${pkg.price.toFixed(2)}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pkg.duration_days} days</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium text-gray-900">{pkg.average_rating.toFixed(1)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            pkg.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {pkg.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => editPackage(pkg)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePackage(pkg.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">All Bookings</h2>
              <p className="text-sm text-gray-600 mt-1">View and manage bookings</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participants</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Travel Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booked</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">{booking.booking_reference}</code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.package.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.participants}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(booking.travel_date)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.booking_status)}`}>
                          {booking.booking_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(booking.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
              <p className="text-sm text-gray-600 mt-1">View all payment transactions</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">{payment.payment_reference}</code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.package.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">${payment.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-orange-600">${payment.affiliator_commission.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.payment_status)}`}>
                          {payment.payment_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(payment.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
              <p className="text-sm text-gray-600 mt-1">Moderate customer reviews</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reviews.map((review) => (
                    <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{review.user.name}</p>
                          <p className="text-xs text-gray-500">{review.user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium text-gray-900">{review.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-sm text-gray-600 truncate">{review.comment}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          review.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {review.is_approved ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(review.created_at)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          {!review.is_approved && (
                            <button
                              onClick={() => handleReviewAction(review.id, 'approve')}
                              className="text-green-600 hover:text-green-800 flex items-center gap-1"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleReviewAction(review.id, 'delete')}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Coupons Tab */}
        {activeTab === 'coupons' && (
          <div>
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Discount Coupons</h2>
                  <p className="text-sm text-gray-600 mt-1">Manage promotional codes</p>
                </div>
                {!showCouponForm && (
                  <button
                    onClick={() => setShowCouponForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create Coupon
                  </button>
                )}
              </div>
              
              {showCouponForm && (
                <div className="p-6 bg-gray-50 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Coupon</h3>
                  <form onSubmit={handleCreateCoupon} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code</label>
                      <input
                        type="text"
                        value={couponForm.code}
                        onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="SUMMER2025"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Discount %</label>
                      <input
                        type="number"
                        step="0.01"
                        value={couponForm.discount_percentage}
                        onChange={(e) => setCouponForm({ ...couponForm, discount_percentage: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Discount ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={couponForm.max_discount_amount}
                        onChange={(e) => setCouponForm({ ...couponForm, max_discount_amount: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Min Purchase ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={couponForm.min_purchase_amount}
                        onChange={(e) => setCouponForm({ ...couponForm, min_purchase_amount: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Usage Limit</label>
                      <input
                        type="number"
                        value={couponForm.usage_limit}
                        onChange={(e) => setCouponForm({ ...couponForm, usage_limit: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expires At</label>
                      <input
                        type="datetime-local"
                        value={couponForm.expires_at}
                        onChange={(e) => setCouponForm({ ...couponForm, expires_at: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2 flex gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Creating...' : 'Create Coupon'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowCouponForm(false);
                          setCouponForm({ code: '', discount_percentage: '', max_discount_amount: '', min_purchase_amount: '', usage_limit: '', expires_at: '' });
                        }}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Limits</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usage</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expires</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {coupons.map((coupon) => (
                      <tr key={coupon.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <code className="px-3 py-1 bg-blue-100 text-blue-800 rounded font-mono text-sm font-bold">{coupon.code}</code>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            <p className="font-semibold text-gray-900">{coupon.discount_percentage}%</p>
                            <p className="text-xs text-gray-500">Max: ${coupon.max_discount_amount}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          Min: ${coupon.min_purchase_amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">{coupon.used_count} / {coupon.usage_limit}</p>
                            <p className="text-xs text-gray-500">
                              {((coupon.used_count / coupon.usage_limit) * 100).toFixed(0)}% used
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(coupon.expires_at)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            coupon.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {coupon.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDeleteCoupon(coupon.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Withdrawals Tab */}
        {activeTab === 'withdrawals' && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Withdrawal Requests</h2>
              <p className="text-sm text-gray-600 mt-1">Approve or reject affiliate withdrawals</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Affiliator ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bank Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {withdrawals.map((withdrawal) => (
                    <tr key={withdrawal.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-lg font-bold text-gray-900">${withdrawal.amount.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">#{withdrawal.affiliator_id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{withdrawal.bank_name}</p>
                          <p className="text-gray-600">{withdrawal.account_number}</p>
                          <p className="text-gray-500 text-xs">{withdrawal.account_name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(withdrawal.status)}`}>
                          {withdrawal.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(withdrawal.created_at)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {withdrawal.status.toLowerCase() === 'pending' && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleWithdrawalAction(withdrawal.id, 'approve')}
                              disabled={loading}
                              className="text-green-600 hover:text-green-800 disabled:opacity-50 flex items-center gap-1"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-xs">Approve</span>
                            </button>
                            <button
                              onClick={() => handleWithdrawalAction(withdrawal.id, 'reject')}
                              disabled={loading}
                              className="text-red-600 hover:text-red-800 disabled:opacity-50 flex items-center gap-1"
                            >
                              <XCircle className="w-4 h-4" />
                              <span className="text-xs">Reject</span>
                            </button>
                          </div>
                        )}
                        {withdrawal.status.toLowerCase() !== 'pending' && (
                          <span className="text-xs text-gray-500">No actions available</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Activity Logs Tab */}
        {activeTab === 'logs' && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Activity Logs</h2>
              <p className="text-sm text-gray-600 mt-1">Track system activities and user actions</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activityLogs.length > 0 ? (
                    activityLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm font-medium text-gray-900">User #{log.user_id}</p>
                            <p className="text-xs text-gray-500">{log.user_type}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 max-w-md">
                          <p className="text-sm text-gray-600 truncate">{log.description}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <code className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">{log.ip_address}</code>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(log.created_at)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        <Activity className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p className="font-medium">No activity logs found</p>
                        <p className="text-sm mt-1">Activity logs will appear here</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;