import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../services/auth.services";
import type { SignupPayload } from "../types/signupPayload";
import { toast } from "react-toastify";
import { signupSchema } from "../validations/auth.validation";
import { ZodError } from "zod";
const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<SignupPayload>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);

    const validatedData = signupSchema.parse(form);

    await signupService(validatedData);

    toast.success("Signup successful ✅ Waiting for admin approval");
    navigate("/login");
  } catch (err: any) {
  if (err instanceof ZodError) {
    const passwordErrors = err.issues
      .filter((e) => e.path[0] === "password")
      .map((e) => e.message);

    if (passwordErrors.length > 0) {
      toast.error(`Weak Password ❌: ${passwordErrors.join(", ")}`);
    } else {
      toast.error(err.issues[0].message);
    }

  } 
  else if (err.response?.data?.message) {
    toast.error(err.response.data.message);
  } 
  else if (err.message) {
    toast.error(err.message);
  } 
  else {
    toast.error("Something went wrong");
  }
}
finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-800 flex-col justify-between p-12 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-700 rounded-full opacity-20 -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-700 rounded-full opacity-20 -ml-40 -mb-40"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-900">🎓</span>
            </div>
            <h1 className="text-3xl font-bold">Little Flower</h1>
          </div>
          <p className="text-blue-100 text-lg">UP School Management System</p>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Empowering Education, Inspiring Futures
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-8">
            Join our community of dedicated educators. Register as a teacher and access our comprehensive school management platform.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-blue-900">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Streamlined Management</h3>
                <p className="text-blue-100 text-sm">Manage classes, assignments, and student progress efficiently</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-blue-900">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Secure Platform</h3>
                <p className="text-blue-100 text-sm">Your data is protected with enterprise-grade security</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-blue-900">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Real-time Communication</h3>
                <p className="text-blue-100 text-sm">Connect with students, parents, and colleagues instantly</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-blue-200 text-sm relative z-10">
          © 2024 Little Flower UP School. All rights reserved.
        </p>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-blue-900">🎓</span>
              </div>
              <h1 className="text-2xl font-bold text-blue-900">Little Flower</h1>
            </div>
            <p className="text-slate-600 text-sm">UP School Management System</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Teacher Signup</h2>
            <p className="text-slate-600 mb-8 text-sm leading-relaxed">
              Create your account to join our teaching community. Your registration will be reviewed by our admin team.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-0 bg-white text-slate-900 placeholder-slate-400 transition-colors"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-0 bg-white text-slate-900 placeholder-slate-400 transition-colors"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-0 bg-white text-slate-900 placeholder-slate-400 transition-colors"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Use at least 8 characters with a mix of letters and numbers
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-400 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:shadow-lg active:scale-95 disabled:cursor-not-allowed mt-8"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Approval Notice */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-900">
                <span className="font-semibold">Admin Approval Required:</span> After signup, your account will be reviewed by our administration team within 24-48 hours.
              </p>
            </div>

            {/* Login Link */}
            <p className="text-center text-slate-600 mt-8">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Login here
              </button>
            </p>
          </div>

          {/* Security Badge */}
          <div className="text-center mt-6">
            <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
              <span>🔒</span> Your data is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
