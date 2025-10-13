import React from 'react';
import { Affiliator } from '../interfaces/AdminInterfaces';

interface AffiliatorsProps {
  affiliators: Affiliator[];
  formatDate: (dateString: string) => string;
}

const Affiliators: React.FC<AffiliatorsProps> = ({ affiliators, formatDate }) => {
  return (
    <div className="overflow-hidden bg-white border border-gray-100 shadow-md rounded-xl">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Affiliators</h2>
        <p className="mt-1 text-sm text-gray-600">Manage affiliate partners</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Code</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Total Commission</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Withdrawn</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Joined</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {affiliators.map((aff) => (
              <tr key={aff.id} className="transition-colors hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{aff.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{aff.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <code className="px-2 py-1 font-mono text-xs bg-gray-100 rounded">{aff.affiliate_code}</code>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-green-600 whitespace-nowrap">${aff.total_commission.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm font-semibold text-blue-600 whitespace-nowrap">${aff.withdrawn_commission.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    aff.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {aff.is_verified ? 'Verified' : 'Unverified'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{formatDate(aff.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Affiliators;