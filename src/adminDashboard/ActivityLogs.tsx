import React from 'react';
import { Activity } from 'lucide-react';
import { ActivityLog } from '../interfaces/AdminInterfaces';

interface ActivityLogsProps {
  activityLogs: ActivityLog[];
  formatDate: (dateString: string) => string;
}

const ActivityLogs: React.FC<ActivityLogsProps> = ({ activityLogs, formatDate }) => {
  return (
    <div className="overflow-hidden bg-white border border-gray-100 shadow-md rounded-xl">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Activity Logs</h2>
        <p className="mt-1 text-sm text-gray-600">Track system activities and user actions</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Action</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">IP Address</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activityLogs.length > 0 ? (
              activityLogs.map((log) => (
                <tr key={log.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">User #{log.user_id}</p>
                      <p className="text-xs text-gray-500">{log.user_type}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                      {log.action}
                    </span>
                  </td>
                  <td className="max-w-md px-6 py-4">
                    <p className="text-sm text-gray-600 truncate">{log.description}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="px-2 py-1 font-mono text-xs bg-gray-100 rounded">{log.ip_address}</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{formatDate(log.created_at)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  <Activity className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p className="font-medium">No activity logs found</p>
                  <p className="mt-1 text-sm">Activity logs will appear here</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityLogs;