import { Link, useNavigate } from "react-router-dom";
import {
  RiBankLine,
  RiShieldCheckLine,
  RiLineChartLine,
  RiSendPlaneLine,
  RiArrowRightLine,
} from "react-icons/ri";

import { useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-white/50">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">

      {/* Hero */}
      <section className="text-center px-6 py-28 max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold leading-tight mb-6">
          Welcome back{" "}
          <span className="text-amber-400 italic">
            {user?.name?.split(" ")[0]}
          </span>
        </h1>

        <p className="text-white/50 mb-8">
          Manage your finances, track transactions, and send money instantly.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/dashboard"
            className="bg-amber-400 text-black px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
          >
            Go to Dashboard <RiArrowRightLine />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-6 max-w-5xl mx-auto pb-24">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <RiShieldCheckLine size={22} className="text-emerald-400 mb-3" />
          <h3 className="font-semibold mb-2">Secure Transactions</h3>
          <p className="text-sm text-white/50">
            All transactions are protected with strong encryption.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <RiLineChartLine size={22} className="text-blue-400 mb-3" />
          <h3 className="font-semibold mb-2">Real-time Tracking</h3>
          <p className="text-sm text-white/50">
            Track your balance and transactions instantly.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <RiSendPlaneLine size={22} className="text-violet-400 mb-3" />
          <h3 className="font-semibold mb-2">Instant Transfers</h3>
          <p className="text-sm text-white/50">
            Send money quickly to anyone with zero hassle.
          </p>
        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © 2026 BankX. All rights reserved.
      </footer>

    </div>
  );
};

export default Home;