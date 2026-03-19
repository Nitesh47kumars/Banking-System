import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiBankLine } from "react-icons/ri";

import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [clientError, setClientError] = useState({});
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newError = {};

    if (!form.email) newError.email = "Email must Required!";
    if (!form.password) newError.password = "Password must required!";
    else if (form.password.length < 8)
      newError.passwordlength = "Password must be atleast 8 digits!";

    return newError;
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const validateError = validate();

    if (Object.keys(validateError).length) {
      return setClientError(validateError);
    }

    try {
      await dispatch(login(form)).unwrap();
      navigate("/dashboard");
    } catch (err) {
      console.log("LOGIN ERROR:", err);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#0a0a0b] p-4">
      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 bg-white/5">
        {/* LEFT PANEL */}
        <div className="hidden md:flex w-2/5 bg-[#0f0f11] text-white p-10 flex-col justify-center border-r border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-amber-400 rounded-lg grid place-items-center">
              <RiBankLine size={16} className="text-black" />
            </div>
            <span className="font-bold text-lg">BankX</span>
          </div>

          <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>

          <p className="text-white/50 mb-8">
            Login to access your banking dashboard and manage your account
            securely.
          </p>

          <div className="flex gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex items-center justify-center p-10">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-2 text-white">Sign In</h2>

            <p className="text-white/50 mb-6">
              Enter your credentials to continue
            </p>

            <form onSubmit={onHandleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="text-sm text-white/60">Email</label>

                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="example@email.com"
                  className="w-full border border-white/10 rounded-lg p-3 mt-1 bg-white/5 text-white placeholder-white/40 focus:border-amber-400 outline-none"
                />

                {clientError.email && (
                  <p className="text-red-400 text-sm">{clientError.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-white/60">Password</label>

                <div className="relative mt-1">
                  <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full border border-white/10 rounded-lg p-3 pr-14 bg-white/5 text-white placeholder-white/40 focus:border-amber-400 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-sm text-white/40 hover:text-white"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {(clientError.password || clientError.passwordlength) && (
                  <p className="text-red-400 text-sm">
                    {clientError.password || clientError.passwordlength}
                  </p>
                )}
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-amber-400 cursor-pointer text-black py-3 rounded-lg font-semibold hover:bg-amber-300"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-sm text-center mt-6 text-white/50">
              Don't have an account?{" "}
              <Link to="/register" className="text-amber-400 font-semibold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
