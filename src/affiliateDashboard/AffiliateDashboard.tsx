import React, { useState, useEffect } from "react";
import { 
  Users, 

  Copy, 
  CheckCircle,

  UserPlus,

  RefreshCw
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { authFetchs, API_BASE } from "../config";

interface Statistics {
  total_referrals: number;
  active_referrals: number;
  total_bookings: number;
  total_paid_users: number;
}

interface Referral {
  id: number;
  name: string;
  email: string;
  phone: string;
  is_verified: boolean;
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
  const [activeTab, setActiveTab] = useState<'overview' | 'referrals' | 'commissions' >('overview');
  const [copiedCode, setCopiedCode] = useState(false);
  
  // State for API data
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [profile, setProfile] = useState<AffiliateProfile | null>(null);
  

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchStatistics(),
      fetchReferrals(),
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

  const fetchProfile = async () => {
    try {
      const data = await authFetchs(`${API_BASE}/affiliators/me`);
      setProfile(data);
    } catch (err) {
      console.error('Failed to fetch profile', err);
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
            {['overview', 'referrals', 'conversions'].map((tab) => (
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
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Total conversions</p>
                <p className="text-3xl font-bold text-gray-900">{statistics.total_bookings}</p>
                <p className="text-sm text-gray-500 mt-2">All time earnings</p>
              </div>

               <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Total conversions paid</p>
                <p className="text-3xl font-bold text-gray-900">{statistics.total_paid_users}</p>
                <p className="text-sm text-gray-500 mt-2">All time earnings</p>
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
        {activeTab === 'conversions' && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">conversions Details</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-8 h-8 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Total conversions</h3>
                </div>
                <p className="text-4xl font-bold text-green-600">{statistics?.total_bookings}</p>
                <p className="text-sm text-gray-600 mt-2">Lifetime earnings from all referrals</p>
              </div>


             
            </div>
          </div>
        )}

      
      </div>
    </div>
  );
};

export default AffiliateDashboard;