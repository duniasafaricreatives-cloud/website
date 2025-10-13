// src/interfaces/AdminInterfaces.ts
export interface Statistics {
  users: {
    total: number;
    verified: number;
    unverified: number;
  };
  affiliators: {
    total: number;
  };
  packages: {
    total: number;
    active: number;
    inactive: number;
  };
  bookings: {
    total: number;
    pending: number;
    confirmed: number;
  };
  payments: {
    total: number;
    total_revenue: number;
    total_commissions: number;
    net_revenue: number;
  };
  reviews: {
    total: number;
    pending: number;
  };
  withdrawals: {
    pending: number;
  };
}

export interface ActivityLog {
  id: number;
  user_id: number;
  user_type: string;
  action: string;
  description: string;
  ip_address: string;
  created_at: string;
}

export interface Withdrawal {
  id: number;
  affiliator_id: number;
  amount: number;
  status: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  created_at: string;
}

export interface Coupon {
  id: number;
  code: string;
  discount_percentage: number;
  max_discount_amount: number;
  min_purchase_amount: number;
  usage_limit: number;
  used_count: number;
  is_active: boolean;
  expires_at: string;
}

export interface Review {
  id: number;
  user_id: number;
  package_id: number;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  is_verified: boolean;
  created_at: string;
}

export interface Booking {
  id: number;
  user_id: number;
  package_id: number;
  booking_status: string;
  booking_reference: string;
  participants: number;
  travel_date: string;
  created_at: string;
  package: {
    name: string;
  };
}

export interface Payment {
  id: number;
  user_id: number;
  package_id: number;
  amount: number;
  affiliator_commission: number;
  payment_status: string;
  payment_reference: string;
  paystack_reference: string;
  created_at: string;
  package: {
    name: string;
  };
}

 export interface Tier {
  id: number;
  name: string;
  price: number;
  discount_price: number | null;
  max_participants: number;
  visa_application: boolean;
  return_flights: boolean;
  fez_casablanca_train: boolean;
  hotel_shuttle: boolean;
  bed_and_breakfast: boolean;
  city_taxes_included: boolean;
  welcome_dinner: boolean;
  official_match_tickets: boolean;
  desert_camping: boolean;
  meknes_volubilis_tour: boolean;
  hammam_retreat: boolean;
  dunia_safari_memento: boolean;
}

export interface TravelPackage {
  id: number;
  name: string;
  description: string;
  price: number;
  specials: string[];
  color: string;
  duration_days: number;
  is_active: boolean;
  created_at: string;
  tiers: Tier[];
}

export interface Affiliator {
  id: number;
  name: string;
  email: string;
  affiliate_code: string;
  total_commission: number;
  withdrawn_commission: number;
  is_verified: boolean;
  created_at: string;
}