import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Users, FileText, CreditCard, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {authFetchs, API_BASE } from '../config';

interface BookingState {
  package_id: number;
  package_name: string;
  package_tier_id: number;
  tier_name: string;
  price: number;
  original_price: number;
  discount_price: number | null;
  max_participants: number;
}

interface BookingFormData {
  participants: number;
  travel_date: string;
  special_requests: string;
}

const BookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const bookingState = location.state as BookingState;

  const [formData, setFormData] = useState<BookingFormData>({
    participants: 1,
    travel_date: '',
    special_requests: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Redirect if no booking data
  useEffect(() => {
    if (!bookingState) {
      navigate('/packages');
    }
  }, [bookingState, navigate]);

  // Check authentication and redirect to itinerary if not logged in
  useEffect(() => {
    if (!user) {
      // Save the booking state to sessionStorage so we can restore it after login
      if (bookingState) {
        sessionStorage.setItem('pendingBooking', JSON.stringify(bookingState));
      }
      // Redirect back to the package page
      navigate(`/ItineraryDynamic/${bookingState?.package_id || ''}`);
    }
  }, [user, bookingState, navigate]);

  if (!bookingState) {
    return null;
  }

  // Calculate total amount
  const calculateTotal = () => {
    return bookingState.price * formData.participants;
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'participants' ? parseInt(value) || 1 : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    if (!user) {
      setError('Authentication required. Please log in again.');
      setLoading(false);
      return;
    }

    const bookingPayload = {
      package_id: bookingState.package_id,
      package_tier_id: bookingState.package_tier_id,
      participants: formData.participants,
      travel_date: formData.travel_date,
      special_requests: formData.special_requests,
    };

    console.log('Submitting booking:', bookingPayload);

    const result = await authFetchs(`${API_BASE}/bookings/create`, {
      method: 'POST',
      body: JSON.stringify(bookingPayload),
    });

    console.log('Booking created:', result);
    setSuccess(true);

    setTimeout(() => {
      navigate('/user-dashboard', { 
        state: { bookingReference: result.booking_reference } 
      });
    }, 2000);

  } catch (err) {
    console.error('Error creating booking:', err);
    setError(err instanceof Error ? err.message : 'Failed to create booking');
  } finally {
    setLoading(false);
  }
};


  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Complete Your Booking
          </h1>
          <p className="text-gray-600">Fill in the details below to confirm your reservation</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">
              ✓ Booking created successfully! Redirecting to dashboard...
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Booking Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Number of Participants */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Number of Participants
                  </label>
                  <input
                    type="number"
                    name="participants"
                    min="1"
                    max={bookingState.max_participants}
                    value={formData.participants}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum {bookingState.max_participants} participants
                  </p>
                </div>

                {/* Travel Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Travel Date
                  </label>
                  <input
                    type="date"
                    name="travel_date"
                    min={today}
                    value={formData.travel_date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Special Requests (Optional)
                  </label>
                  <textarea
                    name="special_requests"
                    rows={4}
                    value={formData.special_requests}
                    onChange={handleInputChange}
                    placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || success}
                  className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
                    loading || success
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {loading ? 'Processing...' : success ? 'Booking Confirmed!' : 'Confirm Booking'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Package</p>
                  <p className="font-semibold">{bookingState.package_name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Tier</p>
                  <p className="font-semibold">{bookingState.tier_name}</p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Price per person</span>
                    <span className="font-medium">${bookingState.price}</span>
                  </div>
                  {bookingState.discount_price && (
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-gray-500">Original price</span>
                      <span className="text-gray-500 line-through">
                        ${bookingState.original_price}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Participants</span>
                    <span className="font-medium">{formData.participants}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ${calculateTotal()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <CreditCard className="w-4 h-4 inline mr-1" />
                  Your booking will be confirmed pending payment processing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;