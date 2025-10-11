import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  saveToken,
  getToken,
  ApiResponse,
  LoginPayload,
  RegisterPayload,
  registerAffiliate,
  affiliateUser,
  getAffiliateProfile,
  loginAdmin,
} from "../config";

interface User {
  id: number;
  name?: string;
  email: string;
  phone?: string;
  affiliate?: string;
  role?: "user" | "affiliate" | "admin";
  business_name?: string;
  affiliate_code?: string;
  username?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  fetchAffiliate: () => Promise<void>;
  AffiliateLogin: (payload: LoginPayload) => Promise<void>;
  affiliateRegister: (payload: RegisterPayload) => Promise<void>;
  AdminLogin: (payload: LoginPayload) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userType, setUserType] = useState<"user" | "affiliate" | "admin" | null>(null);

  // Fetch user profile (regular user)
  const fetchUser = async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response: ApiResponse<User> = await getUserProfile();
      if (response.success && response.data) {
        const userData = { ...response.data, role: "user" as const };
        setUser(userData);
        setUserType("user");
        localStorage.setItem("userType", "user");
      } else {
        setUser(null);
        setUserType(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
      setUserType(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch affiliate profile
  const fetchAffiliate = async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response: ApiResponse<User> = await getAffiliateProfile();
      if (response.success && response.data) {
        const affiliateData = { ...response.data, role: "affiliate" as const };
        setUser(affiliateData);
        setUserType("affiliate");
        localStorage.setItem("userType", "affiliate");
      } else {
        setUser(null);
        setUserType(null);
      }
    } catch (error) {
      console.error("Error fetching affiliate:", error);
      setUser(null);
      setUserType(null);
    } finally {
      setLoading(false);
    }
  };

  // Login function for regular users
  const login = async (payload: LoginPayload) => {
    setLoading(true);

    try {
      const data = await loginUser(payload);

      if (!data.token) throw new Error("Login failed");

      saveToken(data.token);
      await fetchUser();
    } catch (err: any) {
      console.error("❌ Login Error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login function for affiliates
  const AffiliateLogin = async (payload: LoginPayload) => {
    setLoading(true);

    try {
      const data = await affiliateUser(payload);

      if (!data.token) throw new Error("Affiliate login failed");

      saveToken(data.token);
      await fetchAffiliate();
    } catch (err: any) {
      console.error("❌ Affiliate Login Error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login function for admin (no separate fetch needed)
  const AdminLogin = async (payload: LoginPayload) => {
    setLoading(true);

    try {
      const data = await loginAdmin(payload);

      if (!data.token) throw new Error("Admin login failed");

      saveToken(data.token);
      
      // Set admin data directly from login response
      const adminData: User = {
        ...(data.data || {}),
        email: payload.email,
        role: "admin" as const,
      };
      
      setUser(adminData);
      setUserType("admin");
      localStorage.setItem("userType", "admin");
      localStorage.setItem("adminData", JSON.stringify(adminData));
    } catch (err: any) {
      console.error("❌ Admin Login Error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function for regular users
  const register = async (payload: RegisterPayload) => {
    try {
      setLoading(true);
      const response = await registerUser(payload);
      if (response.success && response.token) {
        saveToken(response.token);
        await fetchUser();
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function for affiliates
  const affiliateRegister = async (payload: RegisterPayload) => {
    try {
      setLoading(true);
      const response = await registerAffiliate(payload);
      if (response.success && response.token) {
        saveToken(response.token);
        await fetchAffiliate();
      } else {
        throw new Error(response.message || "Affiliate registration failed");
      }
    } catch (error) {
      console.error("Affiliate registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    logoutUser();
    setUser(null);
    setUserType(null);
    localStorage.removeItem("userType");
    localStorage.removeItem("adminData");
  };

  // On mount, try to restore session based on stored user type
  useEffect(() => {
    const restoreSession = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      const storedUserType = localStorage.getItem("userType") as "user" | "affiliate" | "admin" | null;

      if (storedUserType === "admin") {
        // Restore admin from localStorage
        const storedAdminData = localStorage.getItem("adminData");
        if (storedAdminData) {
          try {
            const adminData = JSON.parse(storedAdminData);
            setUser(adminData);
            setUserType("admin");
            setLoading(false);
          } catch {
            // If parsing fails, clear everything
            logout();
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } else if (storedUserType === "affiliate") {
        await fetchAffiliate();
      } else if (storedUserType === "user") {
        await fetchUser();
      } else {
        // No stored type, try user first, then affiliate
        try {
          await fetchUser();
        } catch {
          await fetchAffiliate();
        }
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        fetchUser,
        fetchAffiliate,
        AffiliateLogin,
        affiliateRegister,
        AdminLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};