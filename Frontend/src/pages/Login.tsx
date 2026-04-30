import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/auth.services";
import { Eye, EyeOff, Lock, Mail, LogIn } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      setError("");

      const data = await loginService({ email, password });

      if (data.user.role === "admin") {
        setError("Use admin login page");
        setIsLoading(false);
        return;
      }

      login(data);
      navigate("/home", { replace: true });
    } catch (err: any) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      setIsLoading(false);
    }
  };

  const renderError = () => {
    if (!error) return null;

    if (error.toLowerCase().includes("pending")) {
      return (
        <div className="mb-4 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-sm flex items-start gap-3">
          <span className="text-lg mt-0.5">⏳</span>
          <div>
            <p className="font-semibold">Account Under Review</p>
            <p>Your account is awaiting admin approval. Please check back soon.</p>
          </div>
        </div>
      );
    }

    if (error.toLowerCase().includes("blocked")) {
      return (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm flex items-start gap-3">
          <span className="text-lg mt-0.5">🚫</span>
          <div>
            <p className="font-semibold">Account Blocked</p>
            <p>Your account has been blocked. Please contact administration.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-start gap-3">
        <span className="text-lg mt-0.5">❌</span>
        <div>{error}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex items-center justify-center p-4">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative grid md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* Left Section - School Branding */}
        <div className="hidden md:flex flex-col justify-center text-white space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-amber-400 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-blue-900">🌸</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Little Flower</h1>
                <p className="text-amber-300 font-semibold">UP School</p>
              </div>
            </div>
            <p className="text-lg text-blue-100 mt-6 leading-relaxed">
              Welcome back! Access your school management system securely.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span>✓</span>
              </div>
              <div>
                <p className="font-semibold">Secure Access</p>
                <p className="text-blue-100 text-sm">Your data is protected with industry-standard encryption</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span>✓</span>
              </div>
              <div>
                <p className="font-semibold">Easy Management</p>
                <p className="text-blue-100 text-sm">Manage classes, students, and records effortlessly</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span>✓</span>
              </div>
              <div>
                <p className="font-semibold">24/7 Available</p>
                <p className="text-blue-100 text-sm">Access your account anytime from anywhere</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="flex flex-col justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            {/* Mobile Header */}
            <div className="md:hidden mb-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🌸</span>
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-blue-900">Little Flower</p>
                  <p className="text-amber-600 text-xs font-semibold">UP School</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <h2 className="text-3xl font-bold text-blue-900 flex items-center gap-2">
                <LogIn className="w-8 h-8 text-amber-500" />
                Login
              </h2>
              <p className="text-gray-600">Sign in to your account to continue</p>
            </div>

            {renderError()}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <span className="inline-block animate-spin">⏳</span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600 text-sm">
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => navigate("/")}
                  className="text-amber-600 font-semibold hover:text-amber-700 transition-colors"
                >
                  Sign up here
                </button>
              </p>
            </div>

            {/* Security Badge */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
              <span>🔒</span>
              <p>Your information is secure and encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;