import React from 'react';
import { Payment } from '../interfaces/AdminInterfaces';

interface PaymentsProps {
  payments: Payment[];
  formatDate: (dateString: string) => string;
  getStatusColor: (status: string) => string;
}

const Payments: React.FC<PaymentsProps> = ({ payments, formatDate, getStatusColor }) => {
  return (
    <div className="overflow-hidden bg-white border border-gray-100 shadow-md rounded-xl">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
        <p className="mt-1 text-sm text-gray-600">View all payment transactions</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Reference</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Package</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Commission</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id} className="transition-colors hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <code className="px-2 py-1 font-mono text-xs bg-gray-100 rounded">{payment.payment_reference}</code>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{payment.package.name}</td>
                <td className="px-6 py-4 text-sm font-semibold text-green-600 whitespace-nowrap">${payment.amount.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm font-semibold text-orange-600 whitespace-nowrap">${payment.affiliator_commission.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.payment_status)}`}>
                    {payment.payment_status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{formatDate(payment.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;