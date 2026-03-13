import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiBankLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../redux/authSlice";

export default function Register() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

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

    const result = await dispatch(register(form));

    console.log(result);

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] p-4">
      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 bg-white/5">
        {/* LEFT PANEL */}
        <div className="hidden md:flex w-2/5 bg-[#0f0f11] text-white p-10 flex-col justify-center border-r border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-amber-400 rounded-lg grid place-items-center">
              <RiBankLine className="text-black" size={16} />
            </div>
            <span className="font-bold text-lg">BankX</span>
          </div>

          <h2 className="text-2xl font-bold leading-snug mb-4">
            Start your banking journey today.
          </h2>

          <p className="text-white/50 text-sm">
            Join thousands of users managing their finances securely.
          </p>

          <div className="flex gap-2 mt-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 p-10">
          <h1 className="text-3xl font-bold text-white mb-8">Create account</h1>

          <form onSubmit={onHandleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={onHandleChange}
              className="w-full border border-white/10 p-3 rounded-lg bg-white/5 text-white placeholder-white/40 focus:border-amber-400 outline-none"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name}</p>
            )}

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onHandleChange}
              className="w-full border border-white/10 p-3 rounded-lg bg-white/5 text-white placeholder-white/40 focus:border-amber-400 outline-none"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email}</p>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={onHandleChange}
                className="w-full border border-white/10 p-3 rounded-lg bg-white/5 text-white placeholder-white/40 focus:border-amber-400 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-white/40"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

              {errors.password && (
                <p className="text-red-400 text-sm">{errors.password}</p>
              )}
            </div>

            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={onHandleChange}
              className="w-full border border-white/10 p-3 rounded-lg bg-white/5 text-white placeholder-white/40 focus:border-amber-400 outline-none"
            />

            {errors.confirmPassword && (
              <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
            )}

            <button
              className="w-full bg-amber-400 text-black py-3 rounded-lg font-semibold hover:bg-amber-300"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-white/50">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-400 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
