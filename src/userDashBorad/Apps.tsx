import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CreditCard, 
  Package as PackageIcon, 
  Users, 
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  DollarSign,
  Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authFetchs, API_BASE } from '../config';

interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price: number;
  duration_days: number;
  destination: string;
  image_url: string;
  max_participants: number;
  is_active: boolean;
  created_at: string;
  average_rating: number;
  total_reviews: number;
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
  package: Package;
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
  package: Package;
}

interface userProfile {
  id: number;
  name: string;
  email: string;
}

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'payments'>('overview');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<userProfile | null>(null);
  const [processingPayment, setProcessingPayment] = useState<number | null>(null);

  const fetchBookings = async () => {
    try {
      const data = await authFetchs(`${API_BASE}/users/bookings`);
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch bookings', err);
      setBookings([]);
    }
  };

  const fetchPayments = async () => {
    try {
      const data = await authFetchs(`${API_BASE}/users/payments`);
      setPayments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch payments', err);
      setPayments([]);
    }
  };

  const fetchProfile = async () => {
    try {
      const data = await authFetchs(`${API_BASE}/users/me`);
      setProfile(data);
    } catch (err) {
      console.error('Failed to fetch profile', err);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([fetchBookings(), fetchProfile(), fetchPayments()]);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchAllData();
    }
  }, [user]);

  const hasSuccessfulPayment = (bookingId: number) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return false;
    return payments.some(
      p => p.package_id === booking.package_id &&
           p.payment_status.toLowerCase().includes('success')
    );
  };

  const handlePayment = async (bookingId: number) => {
    setProcessingPayment(bookingId);
    try {
      const response = await authFetchs(`${API_BASE}/payments/initialize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booking_id: bookingId })
      });

      if (response.authorization_url) {
        window.location.href = response.authorization_url;
      } else {
        alert('Failed to initialize payment. Please try again.');
      }
    } catch (err) {
      console.error('Payment initialization failed', err);
      alert('Payment initialization failed. Please try again.');
    } finally {
      setProcessingPayment(null);
    }
  };

  const getStatusIcon = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('confirmed') || statusLower.includes('success') || statusLower.includes('completed')) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    } else if (statusLower.includes('pending')) {
      return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    } else if (statusLower.includes('cancelled') || statusLower.includes('failed')) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }
    return <Clock className="w-5 h-5 text-gray-600" />;
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('confirmed') || statusLower.includes('success') || statusLower.includes('completed')) {
      return 'bg-green-100 text-green-800';
    } else if (statusLower.includes('pending')) {
      return 'bg-yellow-100 text-yellow-800';
    } else if (statusLower.includes('cancelled') || statusLower.includes('failed')) {
      return 'bg-red-100 text-red-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const stats = {
    totalBookings: bookings.length,
    upcomingTrips: bookings.filter(b => new Date(b.travel_date) > new Date()).length,
    totalSpent: payments.reduce((sum, p) => sum + p.amount, 0),
    successfulPayments: payments.filter(p => p.payment_status.toLowerCase().includes('success')).length
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <AlertCircle className="w-16 h-16 text-amber-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please login to view your dashboard.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-amber-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {profile?.name || user?.name}!</p>
          </div>
          <button
            onClick={fetchAllData}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        <div className="mb-8 border-b border-gray-200">
          <nav className="flex space-x-8">
            {['overview', 'bookings', 'payments'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-amber-600 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <PackageIcon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
                <p className="text-sm text-gray-500 mt-2">All time bookings</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Upcoming Trips</p>
                <p className="text-3xl font-bold text-gray-900">{stats.upcomingTrips}</p>
                <p className="text-sm text-gray-500 mt-2">Scheduled travels</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <DollarSign className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Total Spent</p>
                <p className="text-3xl font-bold text-gray-900">${stats.totalSpent.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-2">All payments</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Successful Payments</p>
                <p className="text-3xl font-bold text-gray-900">{stats.successfulPayments}</p>
                <p className="text-sm text-gray-500 mt-2">Completed transactions</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
              </div>
              <div className="p-6">
                {bookings.slice(0, 3).length > 0 ? (
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <PackageIcon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{booking.package.name}</h3>
                          <p className="text-sm text-gray-600">
                            <MapPin className="w-3 h-3 inline mr-1" />
                            {booking.package.destination} • {booking.participants} participant(s)
                          </p>
                          <p className="text-sm text-gray-500">
                            Travel: {formatDate(booking.travel_date)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.booking_status)}`}>
                            {booking.booking_status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <PackageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No bookings yet</p>
                    <p className="text-sm text-gray-400 mt-1">Start exploring our travel packages!</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Recent Payments</h2>
              </div>
              <div className="p-6">
                {payments.slice(0, 3).length > 0 ? (
                  <div className="space-y-4">
                    {payments.slice(0, 3).map((payment) => (
                      <div key={payment.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CreditCard className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{payment.package.name}</h3>
                          <p className="text-sm text-gray-600">Ref: {payment.payment_reference}</p>
                          <p className="text-sm text-gray-500">{formatDate(payment.created_at)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">${payment.amount.toFixed(2)}</p>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.payment_status)}`}>
                            {payment.payment_status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No payments yet</p>
                    <p className="text-sm text-gray-400 mt-1">Your payment history will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">All Bookings</h2>
              <p className="text-sm text-gray-600 mt-1">View and manage your travel bookings</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Travel Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participants</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(booking.booking_status)}
                            <span className="text-sm font-medium text-gray-900">{booking.booking_reference}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">{booking.package.name}</p>
                            <p className="text-gray-500 text-xs">{booking.package.duration_days} days</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            {booking.package.destination}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(booking.travel_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1 text-sm text-gray-900">
                            <Users className="w-4 h-4" />
                            {booking.participants}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.booking_status)}`}>
                            {booking.booking_status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {booking.booking_status.toLowerCase() === 'confirmed' && !hasSuccessfulPayment(booking.id) && (
                            <button
                              onClick={() => handlePayment(booking.id)}
                              disabled={processingPayment === booking.id}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                              {processingPayment === booking.id ? (
                                <>
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <CreditCard className="w-4 h-4" />
                                  Pay Now
                                </>
                              )}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        <PackageIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p className="font-medium">No bookings found</p>
                        <p className="text-sm mt-1">Start exploring our amazing travel packages!</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
              <p className="text-sm text-gray-600 mt-1">Track all your payment transactions</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paystack Ref</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.length > 0 ? (
                    payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(payment.payment_status)}
                            <span className="text-sm font-medium text-gray-900">{payment.payment_reference}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">{payment.package.name}</p>
                            {payment.package.average_rating > 0 && (
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span className="text-xs text-gray-500">{payment.package.average_rating} ({payment.package.total_reviews})</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-lg font-bold text-gray-900">${payment.amount.toFixed(2)}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.payment_status)}`}>
                            {payment.payment_status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                          {payment.paystack_reference}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(payment.created_at)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        <CreditCard className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p className="font-medium">No payments found</p>
                        <p className="text-sm mt-1">Your payment history will appear here</p>
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

export default UserDashboard;