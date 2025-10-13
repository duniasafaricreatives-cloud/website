import React, { useState } from "react";
import { X, Users, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";



interface AuthModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, setIsOpen }) => {
  const { login, register, AffiliateLogin, affiliateRegister } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<"user" | "affiliate">("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [affiliateCode, setAffiliateCode] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Login based on user type
        const loginPayload = { email, password };
        
        if (userType === "affiliate") {
          if (AffiliateLogin) {
            await AffiliateLogin(loginPayload);
          } else {
            throw new Error("Affiliate login function is not available.");
          }
        } else {
          await login(loginPayload);
        }
        
        // Close modal on successful login
        setIsOpen(false);
        resetForm();
      } else {
        // Registration based on user type
        if (userType === "affiliate") {
          const affiliatePayload = {
            name,
            email,
            phone,
            business_name: businessName,
            password,
          };
          if (affiliateRegister) {
            await affiliateRegister(affiliatePayload);
            alert("Affiliate registration successful! Please login.");
          } else {
            throw new Error("Affiliate registration function is not available.");
          }
        } else {
          const userPayload = {
            name,
            email,
            phone,
            affiliate: affiliateCode || undefined,
            password,
          };
          await register(userPayload);
          alert("Registration successful! Please login.");
        }
        
        // Switch to login mode after successful registration
        setIsLogin(true);
        resetForm();
      }
    } catch (err: any) {
      console.error("❌ Error:", err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAffiliateCode("");
    setBusinessName("");
    setPassword("");
    setError(null);
  };

  const handleUserTypeChange = (type: "user" | "affiliate") => {
    setUserType(type);
    resetForm();
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 transition rounded-full hover:bg-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* User Type Selector */}
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => handleUserTypeChange("user")}
            className={`flex-1 py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${
              userType === "user"
                ? "bg-amber-600 text-white shadow-lg"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            <UserCircle className="w-4 h-4" />
            <span className="text-sm font-medium">User</span>
          </button>
          <button
            type="button"
            onClick={() => handleUserTypeChange("affiliate")}
            className={`flex-1 py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${
              userType === "affiliate"
                ? "bg-amber-600 text-white shadow-lg"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">Affiliate</span>
          </button>
        </div>

        {error && (
          <div className="p-3 mb-3 text-sm text-red-400 border rounded-md bg-red-900/30 border-red-500/30">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-200">
                  {userType === "affiliate" ? "Contact Name" : "Full Name"}
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-white placeholder-gray-400 border rounded-md bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-200">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-white placeholder-gray-400 border rounded-md bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="+233 *******"
                  required
                />
              </div>

              {userType === "affiliate" ? (
                <div>
                  <label htmlFor="businessName" className="block mb-1 text-sm font-medium text-gray-200">
                    Business Name
                  </label>
                  <input
                    id="businessName"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-3 py-2 text-white placeholder-gray-400 border rounded-md bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Your business or organization name"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="affiliateCode" className="block mb-1 text-sm font-medium text-gray-200">
                    Affiliate Code <span className="text-xs text-gray-400">(Optional)</span>
                  </label>
                  <input
                    id="affiliateCode"
                    type="text"
                    value={affiliateCode}
                    onChange={(e) => setAffiliateCode(e.target.value)}
                    className="w-full px-3 py-2 text-white placeholder-gray-400 border rounded-md bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Enter affiliate code (optional)"
                  />
                </div>
              )}
            </>
          )}

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-white placeholder-gray-400 border rounded-md bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-white placeholder-gray-400 border rounded-md bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-2.5 px-4 rounded-md font-medium transition-colors ${
              loading
                ? "bg-amber-400/50 cursor-not-allowed text-white"
                : "bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? `Login as ${userType === "affiliate" ? "Affiliate" : "User"}`
              : `Sign Up as ${userType === "affiliate" ? "Affiliate" : "User"}`}
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={handleToggleMode}
            className="text-sm transition-colors text-amber-400 hover:text-amber-300 hover:underline"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </button>
        </div>

        {!isLogin && (
          <div className="px-4 mt-3 text-xs text-center text-gray-400">
            {userType === "affiliate"
              ? "Join as an affiliate partner to earn commissions and grow your business"
              : "Sign up to start placing orders and enjoying our services"}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;