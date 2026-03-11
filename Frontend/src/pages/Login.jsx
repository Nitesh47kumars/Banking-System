import React, { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

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

  const onHandleSubmit = (e) => {
    e.preventDefault();
    const validateError = validate();
    if (Object.keys(validateError).length) {
      return setError(validateError);
    }

    setLoading(true);
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-200 via-gray-200 to-purple-300 p-4">
      <div className="flex w-full max-w-5xl h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-white">
        
        {/* LEFT PANEL */}
        <div className="hidden md:flex w-2/5 bg-black text-white p-10 flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>

          <p className="text-gray-400 mb-8">
            Login to access your banking dashboard and manage your account
            securely.
          </p>

          <div className="flex gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex items-center justify-center p-10">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-2">Sign In</h2>

            <p className="text-gray-500 mb-6">
              Enter your credentials to continue
            </p>

            <form onSubmit={onHandleSubmit} className="space-y-4">
              
              {/* Email */}
              <div>
                <label className="text-sm text-gray-600">Email</label>

                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="example@email.com"
                  className="w-full border rounded-lg p-3 mt-1 bg-gray-50 focus:ring-2 focus:ring-black outline-none"
                />

                {error.email && (
                  <p className="text-red-500 text-sm">{error.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-gray-600">Password</label>

                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="••••••••"
                  className="w-full border rounded-lg p-3 mt-1 bg-gray-50 focus:ring-2 focus:ring-black outline-none"
                />

                {(error.password || error.passwordlength) && (
                  <p className="text-red-500 text-sm">
                    {error.password || error.passwordlength}
                  </p>
                )}
              </div>

              {/* Forgot password */}
              <div className="flex items-center justify-end text-xs">
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:opacity-90"
              >
                {loading ? "Logging in..." : "Login →"}
              </button>
            </form>

            {/* Register link */}
            <p className="text-sm text-center mt-6 text-gray-500">
              Don't have an account?{" "}
              <a href="/register" className="text-black font-semibold underline">
                Register
              </a>
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;