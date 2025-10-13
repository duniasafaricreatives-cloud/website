import React, { useState, useEffect } from "react";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Copy, 
  CheckCircle,
  Calendar,
  UserPlus,
  CreditCard,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { authFetchs, API_BASE } from "../config";

interface Statistics {
  total_referrals: number;
  active_referrals: number;
  total_bookings: number;
  total_commission: number;
  withdrawn_commission: number;
  pending_commission: number;
  conversion_rate: number;
}

interface Referral {
  id: number;
  name: string;
  email: string;
  phone: string;
  is_verified: boolean;
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

interface AffiliateProfile {
  id: number;
  name: string;
  email: string;
  affiliate_code: string;
  total_commission: number;
  withdrawn_commission: number;
  is_verified: boolean;
  created_at: string;
}

const AffiliateDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'referrals' | 'commissions' | 'withdrawals'>('overview');
  const [loading, setLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  
  // State for API data
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [profile, setProfile] = useState<AffiliateProfile | null>(null);
  
  // Withdrawal form state
  const [withdrawalForm, setWithdrawalForm] = useState({
    amount: '',
    bank_name: '',
    account_number: '',
    account_name: ''
  });
  const [showWithdrawalForm, setShowWithdrawalForm] = useState(false);

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchStatistics(),
      fetchReferrals(),
      fetchWithdrawals(),
      fetchProfile()
    ]);
  };

  const fetchStatistics = async () => {
    try {
      const data = await authFetchs(`${API_BASE}/affiliators/statistics`);
      setStatistics(data);
    } catch (err) {
      console.error('Failed to fetch statistics', err);
    }
  };

  const fetchReferrals = async () => {
    try {
      const data = await authFetchs(`${API_BASE}/affiliators/referrals`);
      setReferrals(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch referrals', err);
      setReferrals([]);
    }
  };

  const fetchWithdrawals = async () => {
    try {
      const data = await authFetchs(`${API_BASE}/affiliators/withdrawals`);
      setWithdrawals(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch withdrawals', err);
      setWithdrawals([]);
    }
  };

  const fetchProfile = async () => {
    try {
      const data = await authFetchs(`${API_BASE}/affiliators/me`);
      setProfile(data);
    } catch (err) {
      console.error('Failed to fetch profile', err);
    }
  };

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authFetchs(`${API_BASE}/affiliators/withdrawals`, {
        method: 'POST',
        body: JSON.stringify({
          amount: parseFloat(withdrawalForm.amount),
          bank_name: withdrawalForm.bank_name,
          account_number: withdrawalForm.account_number,
          account_name: withdrawalForm.account_name
        })
      });

      alert('Withdrawal request submitted successfully!');
      setShowWithdrawalForm(false);
      setWithdrawalForm({ amount: '', bank_name: '', account_number: '', account_name: '' });
      
      // Refresh data
      await fetchAllData();
    } catch (err: any) {
      console.error('Failed to submit withdrawal', err);
      alert(err.message || 'Failed to submit withdrawal request');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const referralLink = profile?.affiliate_code 
    ? `${window.location.origin}/ref/${profile.affiliate_code}`
    : '';

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Affiliate Dashboard</h1>
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

        {/* Affiliate Code Card */}
        {profile && (
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 mb-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <p className="text-amber-100 text-sm font-medium mb-1">Your Affiliate Code</p>
                <p className="text-2xl font-bold mb-3">{profile.affiliate_code}</p>
                <p className="text-sm text-amber-100 mb-2">Referral Link:</p>
                <p className="text-sm font-mono bg-white/20 px-3 py-2 rounded-lg inline-block break-all">
                  {referralLink}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(referralLink)}
                className="bg-white text-amber-600 px-6 py-3 rounded-lg font-medium hover:bg-amber-50 transition-colors flex items-center justify-center gap-2 self-start"
              >
                {copiedCode ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex space-x-8">
            {['overview', 'referrals', 'commissions', 'withdrawals'].map((tab) => (
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
                <p className="text-gray-600 text-sm">Total Referrals</p>
                <p className="text-3xl font-bold text-gray-900">{statistics.total_referrals}</p>
                <p className="text-sm text-gray-500 mt-2">{statistics.active_referrals} active</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Total Commission</p>
                <p className="text-3xl font-bold text-gray-900">${statistics.total_commission.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-2">All time earnings</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Calendar className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Pending Commission</p>
                <p className="text-3xl font-bold text-gray-900">${statistics.pending_commission.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-2">Available soon</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Conversion Rate</p>
                <p className="text-3xl font-bold text-gray-900">{statistics.conversion_rate.toFixed(1)}%</p>
                <p className="text-sm text-gray-500 mt-2">{statistics.total_bookings} bookings</p>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Earned</span>
                    <span className="font-semibold text-gray-900">${statistics.total_commission.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Withdrawn</span>
                    <span className="font-semibold text-green-600">${statistics.withdrawn_commission.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Available Balance</span>
                    <span className="font-semibold text-amber-600">
                      ${(statistics.total_commission - statistics.withdrawn_commission - statistics.pending_commission).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Referrals</span>
                    <span className="font-semibold text-gray-900">{statistics.total_referrals}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Successful Bookings</span>
                    <span className="font-semibold text-green-600">{statistics.total_bookings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-semibold text-purple-600">{statistics.conversion_rate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Referrals Tab */}
        {activeTab === 'referrals' && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Your Referrals</h2>
              <p className="text-sm text-gray-600 mt-1">People who signed up using your affiliate link</p>
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
                  {referrals.length > 0 ? (
                    referrals.map((referral) => (
                      <tr key={referral.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {referral.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="ml-3 text-sm font-medium text-gray-900">{referral.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{referral.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{referral.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            referral.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {referral.is_verified ? 'Verified' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(referral.created_at)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        <UserPlus className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p className="font-medium">No referrals yet</p>
                        <p className="text-sm mt-1">Share your referral link to start earning commissions!</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Commissions Tab */}
        {activeTab === 'commissions' && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Commission Details</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Total Commission Earned</h3>
                </div>
                <p className="text-4xl font-bold text-green-600">${profile?.total_commission.toFixed(2) || '0.00'}</p>
                <p className="text-sm text-gray-600 mt-2">Lifetime earnings from all referrals</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertCircle className="w-6 h-6 text-amber-600" />
                    <h3 className="font-semibold text-gray-900">Available for Withdrawal</h3>
                  </div>
                  <p className="text-3xl font-bold text-amber-600">
                    ${((statistics?.total_commission || 0) - (statistics?.withdrawn_commission || 0) - (statistics?.pending_commission || 0)).toFixed(2)}
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Total Withdrawn</h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-600">${profile?.withdrawn_commission.toFixed(2) || '0.00'}</p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowWithdrawalForm(true)}
                  className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors flex items-center gap-2"
                >
                  <DollarSign className="w-5 h-5" />
                  Request Withdrawal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Withdrawals Tab */}
        {activeTab === 'withdrawals' && (
          <div>
            {showWithdrawalForm && (
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">New Withdrawal Request</h2>
                <div onSubmit={handleWithdrawal} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <input
                      type="number"
                      step="0.01"
                      value={withdrawalForm.amount}
                      onChange={(e) => setWithdrawalForm({ ...withdrawalForm, amount: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter amount"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                    <input
                      type="text"
                      value={withdrawalForm.bank_name}
                      onChange={(e) => setWithdrawalForm({ ...withdrawalForm, bank_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter bank name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                    <input
                      type="text"
                      value={withdrawalForm.account_number}
                      onChange={(e) => setWithdrawalForm({ ...withdrawalForm, account_number: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter account number"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                    <input
                      type="text"
                      value={withdrawalForm.account_name}
                      onChange={(e) => setWithdrawalForm({ ...withdrawalForm, account_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter account name"
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleWithdrawal}
                      disabled={loading}
                      className="bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Submit Request'}
                    </button>
                    <button
                      onClick={() => setShowWithdrawalForm(false)}
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Withdrawal History</h2>
                  <p className="text-sm text-gray-600 mt-1">Track all your withdrawal requests</p>
                </div>
                {!showWithdrawalForm && (
                  <button
                    onClick={() => setShowWithdrawalForm(true)}
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors text-sm"
                  >
                    New Request
                  </button>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bank Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {withdrawals.length > 0 ? (
                      withdrawals.map((withdrawal) => (
                        <tr key={withdrawal.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-lg font-semibold text-gray-900">${withdrawal.amount.toFixed(2)}</span>
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {formatDate(withdrawal.created_at)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                          <CreditCard className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                          <p className="font-medium">No withdrawals yet</p>
                          <p className="text-sm mt-1">Request your first withdrawal when you have available balance</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AffiliateDashboard;