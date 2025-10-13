import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Withdrawal } from '../interfaces/AdminInterfaces';
import { authFetchs, API_BASE } from '../config';

interface WithdrawalsProps {
  withdrawals: Withdrawal[];
  formatDate: (dateString: string) => string;
  getStatusColor: (status: string) => string;
  loading: boolean;
  setLoading: (value: boolean) => void;
  fetchWithdrawals: () => Promise<void>;
  fetchStatistics: () => Promise<void>;
}

const Withdrawals: React.FC<WithdrawalsProps> = ({
  withdrawals,
  formatDate,
  getStatusColor,
  loading,
  setLoading,
  fetchWithdrawals,
  fetchStatistics,
}) => {
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

  return (
    <div className="overflow-hidden bg-white border border-gray-100 shadow-md rounded-xl">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Withdrawal Requests</h2>
        <p className="mt-1 text-sm text-gray-600">Approve or reject affiliate withdrawals</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Affiliator ID</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Bank Details</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {withdrawals.map((withdrawal) => (
              <tr key={withdrawal.id} className="transition-colors hover:bg-gray-50">
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
                    <p className="text-xs text-gray-500">{withdrawal.account_name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(withdrawal.status)}`}>
                    {withdrawal.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{formatDate(withdrawal.created_at)}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  {withdrawal.status.toLowerCase() === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleWithdrawalAction(withdrawal.id, 'approve')}
                        disabled={loading}
                        className="flex items-center gap-1 text-green-600 hover:text-green-800 disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs">Approve</span>
                      </button>
                      <button
                        onClick={() => handleWithdrawalAction(withdrawal.id, 'reject')}
                        disabled={loading}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800 disabled:opacity-50"
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
  );
};

export default Withdrawals;