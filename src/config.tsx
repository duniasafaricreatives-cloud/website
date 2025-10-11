// config.tsx
export const API_BASE = "http://localhost:8000/api";

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  affiliate?: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
}

// FIXED: Use consistent token key
const TOKEN_KEY = "auth_token";

// Register new user
export const registerUser = async (
  payload: RegisterPayload
): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to register");
  return data;
};

export const registerAffiliate = async (
  payload: RegisterPayload
): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE}/affiliators/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to register");
  return data;
};

// Login user
export const loginUser = async (
  payload: LoginPayload
): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  console.log("🔍 API response:", data);

  if (!response.ok) throw new Error(data.message || "Failed to login");

  // ✅ Normalize backend response
  return {
    success: true,
    token: data.access_token, // use this instead
    message: "Login successful",
  };
};


export const affiliateUser = async (
  payload: LoginPayload
): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE}/affiliators/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  console.log("🔍 API response:", data);

  if (!response.ok) throw new Error(data.message || "Failed to login");

  // ✅ Normalize backend response
  return {
    success: true,
    token: data.access_token, // use this instead
    message: "Login successful",
  };
};

// Save token - FIXED: Use consistent key
export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Get token - FIXED: Use consistent key
export const getToken = () => localStorage.getItem(TOKEN_KEY);

// Logout - FIXED: Use consistent key
export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Helper: Auth headers
export const getAuthHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Authenticated fetch helper
export const authFetch = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: { ...getAuthHeaders(), ...options.headers },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Request failed");
  return {
    success: true,
    data, // normalize so response.data works in AuthContext
  };
};


export const authFetchs = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
};

// ✅ Fixed: Normalize backend response so AuthContext can read it
export const getUserProfile = async (): Promise<ApiResponse> => {
  const data = await authFetch(`${API_BASE}/users/me`);

  // Your backend returns the user directly, not wrapped
  return {
    success: true,
    data, // normalize so response.data works in AuthContext
  };
};

export const getAffiliateProfile = async (): Promise<ApiResponse> => {
  const data = await authFetch(`${API_BASE}/affiliators/me`);

  // Your backend returns the user directly, not wrapped
  return {
    success: true,
    data, // normalize so response.data works in AuthContext
  };
};

// Admin Login
export const loginAdmin = async (
  payload: LoginPayload
): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  console.log("🔍 Admin API response:", data);

  if (!response.ok) throw new Error(data.message || "Failed to login");

  // ✅ Normalize backend response
  return {
    success: true,
    token: data.access_token,
    message: "Admin login successful",
  };
};

