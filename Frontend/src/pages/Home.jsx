import { Link } from "react-router-dom";
import {
  RiBankLine,
  RiShieldCheckLine,
  RiLineChartLine,
  RiSendPlaneLine,
  RiArrowRightLine,
} from "react-icons/ri";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">

      {/* Navbar */}
      <navbar className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-400 rounded-lg grid place-items-center">
            <RiBankLine className="text-black" size={16} />
          </div>
          <span className="font-bold text-lg">BankX</span>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <Link to="/login" className="text-white/60 hover:text-white">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-amber-400 text-black px-4 py-2 rounded-lg font-medium flex items-center gap-1"
          >
            Get Started <RiArrowRightLine />
          </Link>
        </nav>
      </navbar>

      {/* Hero */}
      <section className="text-center px-6 py-28 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Banking that works{" "}
          <span className="text-amber-400 italic">for you</span>
        </h1>

        <p className="text-white/50 mb-8">
          Manage your finances, track transactions, and send money instantly
          with our secure banking platform.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-amber-400 text-black px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
          >
            Open Account <RiArrowRightLine />
          </Link>

          <Link
            to="/login"
            className="border border-white/20 px-6 py-3 rounded-xl text-white/70 hover:text-white"
          >
            Login
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