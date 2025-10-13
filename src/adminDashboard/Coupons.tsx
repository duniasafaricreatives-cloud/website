import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Coupon } from '../interfaces/AdminInterfaces';
import { authFetchs, API_BASE } from '../config';

interface CouponsProps {
  coupons: Coupon[];
  formatDate: (dateString: string) => string;
  getStatusColor: (status: string) => string;
  showCouponForm: boolean;
  setShowCouponForm: (value: boolean) => void;
  couponForm: {
    code: string;
    discount_percentage: string;
    max_discount_amount: string;
    min_purchase_amount: string;
    usage_limit: string;
    expires_at: string;
  };
  setCouponForm: (form: CouponsProps['couponForm']) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  fetchCoupons: () => Promise<void>;
}

const Coupons: React.FC<CouponsProps> = ({
  coupons,
  formatDate,
  getStatusColor,
  showCouponForm,
  setShowCouponForm,
  couponForm,
  setCouponForm,
  loading,
  setLoading,
  fetchCoupons,
}) => {
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

  return (
    <div className="overflow-hidden bg-white border border-gray-100 shadow-md rounded-xl">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Discount Coupons</h2>
          <p className="mt-1 text-sm text-gray-600">Manage promotional codes</p>
        </div>
        {!showCouponForm && (
          <button
            onClick={() => setShowCouponForm(true)}
            className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Create Coupon
          </button>
        )}
      </div>
      
      {showCouponForm && (
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Create New Coupon</h3>
          <form onSubmit={handleCreateCoupon} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Coupon Code</label>
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
              <label className="block mb-2 text-sm font-medium text-gray-700">Discount %</label>
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
              <label className="block mb-2 text-sm font-medium text-gray-700">Max Discount ($)</label>
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
              <label className="block mb-2 text-sm font-medium text-gray-700">Min Purchase ($)</label>
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
              <label className="block mb-2 text-sm font-medium text-gray-700">Usage Limit</label>
              <input
                type="number"
                value={couponForm.usage_limit}
                onChange={(e) => setCouponForm({ ...couponForm, usage_limit: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Expires At</label>
              <input
                type="datetime-local"
                value={couponForm.expires_at}
                onChange={(e) => setCouponForm({ ...couponForm, expires_at: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Coupon'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCouponForm(false);
                  setCouponForm({ code: '', discount_percentage: '', max_discount_amount: '', min_purchase_amount: '', usage_limit: '', expires_at: '' });
                }}
                className="px-6 py-2 font-medium text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
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
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Code</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Discount</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Limits</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Usage</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Expires</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="transition-colors hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <code className="px-3 py-1 font-mono text-sm font-bold text-blue-800 bg-blue-100 rounded">{coupon.code}</code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">{coupon.discount_percentage}%</p>
                    <p className="text-xs text-gray-500">Max: ${coupon.max_discount_amount}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
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
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{formatDate(coupon.expires_at)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    coupon.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {coupon.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
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
  );
};

export default Coupons;