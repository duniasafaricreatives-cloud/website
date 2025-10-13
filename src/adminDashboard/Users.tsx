import React from 'react';
import { AdminUser } from '../interfaces/AdminInterfaces';

interface UsersProps {
  users: AdminUser[];
  formatDate: (dateString: string) => string;
}

const Users: React.FC<UsersProps> = ({ users, formatDate }) => {
  return (
    <div className="overflow-hidden bg-white border border-gray-100 shadow-md rounded-xl">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">All Users</h2>
        <p className="mt-1 text-sm text-gray-600">Manage platform users</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Joined</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="transition-colors hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-white rounded-full bg-gradient-to-br from-blue-400 to-blue-600">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.is_verified ? 'Verified' : 'Unverified'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{formatDate(user.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;