import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onHandleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = "Full name required";
    if (!form.email.includes("@")) newErrors.email = "Valid email required";
    if (form.password.length < 8) newErrors.password = "Minimum 8 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const res =  await registerUser(form);
      console.log(res);
      setLoading(false);
      navigate("/login")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f4f0] p-4">
      <div className="flex w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl">
        {/* LEFT PANEL */}
        <div className="hidden md:flex w-1/3 bg-black text-white p-10 flex-col justify-center">
          <div className="text-yellow-400 text-4xl mb-6">✦</div>

          <h2 className="text-2xl font-bold leading-snug mb-4">
            Start your journey with us today.
          </h2>

          <p className="text-gray-400 text-sm">
            Join thousands of users building something great.
          </p>

          {/* animated dots */}
          <div className="flex gap-2 mt-8 flex-wrap">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 bg-yellow-400 rounded-full animate-pulse`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 bg-white p-10">
          <h1 className="text-4xl font-extrabold mb-8">Create account</h1>

          <form onSubmit={onHandleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={onHandleChange}
                className="w-full border p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-black outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={onHandleChange}
                className="w-full border p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-black outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password (min 8 characters)"
                value={form.password}
                onChange={onHandleChange}
                className="w-full border p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-black outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={onHandleChange}
                className="w-full border p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-black outline-none"
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit */}
            <button
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account →"}
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-500">
            Already have an account?{" "}
            <Link to="/register" className="text-black font-semibold underline">
              Login
            </Link>
          </p>

          <p className="text-xs text-gray-400 text-center mt-6">
            By registering you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
