import React from 'react';
import { Users, DollarSign, Calendar, Package } from 'lucide-react';
import { Statistics } from '../interfaces/AdminInterfaces';

interface OverviewProps {
  statistics: Statistics | null;
}

const Overview: React.FC<OverviewProps> = ({ statistics }) => {
  if (!statistics) return null;

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white border border-gray-100 shadow-md rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-3xl font-bold text-gray-900">{statistics.users.total}</p>
          <p className="mt-2 text-sm text-gray-500">{statistics.users.verified} verified</p>
        </div>

        <div className="p-6 bg-white border border-gray-100 shadow-md rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">${statistics.payments.total_revenue.toFixed(2)}</p>
          <p className="mt-2 text-sm text-gray-500">Net: ${statistics.payments.net_revenue.toFixed(2)}</p>
        </div>

        <div className="p-6 bg-white border border-gray-100 shadow-md rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Total Bookings</p>
          <p className="text-3xl font-bold text-gray-900">{statistics.bookings.total}</p>
          <p className="mt-2 text-sm text-gray-500">{statistics.bookings.pending} pending</p>
        </div>

        <div className="p-6 bg-white border border-gray-100 shadow-md rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Active Packages</p>
          <p className="text-3xl font-bold text-gray-900">{statistics.packages.active}</p>
          <p className="mt-2 text-sm text-gray-500">of {statistics.packages.total} total</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-6 bg-white border border-gray-100 shadow-md rounded-xl">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Pending Actions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pending Withdrawals</span>
              <span className="font-semibold text-yellow-600">{statistics.withdrawals.pending}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pending Reviews</span>
              <span className="font-semibold text-yellow-600">{statistics.reviews.pending}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pending Bookings</span>
              <span className="font-semibold text-yellow-600">{statistics.bookings.pending}</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 shadow-md rounded-xl">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Financial Overview</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Revenue</span>
              <span className="font-semibold text-green-600">${statistics.payments.total_revenue.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Commissions Paid</span>
              <span className="font-semibold text-orange-600">${statistics.payments.total_commissions.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Net Revenue</span>
              <span className="font-semibold text-blue-600">${statistics.payments.net_revenue.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 shadow-md rounded-xl">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Platform Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Affiliators</span>
              <span className="font-semibold text-gray-900">{statistics.affiliators.total}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Reviews</span>
              <span className="font-semibold text-gray-900">{statistics.reviews.total}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Payments</span>
              <span className="font-semibold text-gray-900">{statistics.payments.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;