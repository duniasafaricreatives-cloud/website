import React from 'react';
import { CheckCircle, Trash2, Star } from 'lucide-react';
import { Review } from '../interfaces/AdminInterfaces';
import { authFetchs, API_BASE } from '../config';

interface ReviewsProps {
  reviews: Review[];
  formatDate: (dateString: string) => string;
  fetchReviews: () => Promise<void>;
  fetchStatistics: () => Promise<void>;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews, formatDate, fetchReviews, fetchStatistics }) => {
  const handleReviewAction = async (id: number, action: 'approve' | 'delete') => {
    if (action === 'delete' && !confirm('Are you sure you want to delete this review?')) return;
    try {
      const method = action === 'approve' ? 'PUT' : 'DELETE';
      await authFetchs(`${API_BASE}/admin/reviews/${id}`, { method });
      alert(`Review ${action}d successfully!`);
      await fetchReviews();
      await fetchStatistics();
    } catch (err: any) {
      alert(err.message || `Failed to ${action} review`);
    }
  };

  return (
    <div className="overflow-hidden bg-white border border-gray-100 shadow-md rounded-xl">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
        <p className="mt-1 text-sm text-gray-600">Moderate customer reviews</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Rating</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Comment</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reviews.map((review) => (
              <tr key={review.id} className="transition-colors hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{review.user.name}</p>
                    <p className="text-xs text-gray-500">{review.user.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{review.rating}</span>
                  </div>
                </td>
                <td className="max-w-xs px-6 py-4">
                  <p className="text-sm text-gray-600 truncate">{review.comment}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    review.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {review.is_approved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{formatDate(review.created_at)}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {!review.is_approved && (
                      <button
                        onClick={() => handleReviewAction(review.id, 'approve')}
                        className="flex items-center gap-1 text-green-600 hover:text-green-800"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleReviewAction(review.id, 'delete')}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reviews;