import React from 'react';
import { Booking } from '../interfaces/AdminInterfaces';

interface BookingsProps {
  bookings: Booking[];
  formatDate: (dateString: string) => string;
  getStatusColor: (status: string) => string;
}

const Bookings: React.FC<BookingsProps> = ({ bookings, formatDate, getStatusColor }) => {
  return (
    <div className="overflow-hidden bg-white border border-gray-100 shadow-md rounded-xl">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">All Bookings</h2>
        <p className="mt-1 text-sm text-gray-600">View and manage bookings</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Reference</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Package</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Participants</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Travel Date</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Booked</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="transition-colors hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <code className="px-2 py-1 font-mono text-xs bg-gray-100 rounded">{booking.booking_reference}</code>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{booking.package.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{booking.participants}</td>
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{formatDate(booking.travel_date)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.booking_status)}`}>
                    {booking.booking_status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{formatDate(booking.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;