import { Link } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";

const CTABanner = ({ user }) => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center relative">
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-amber-400/5 blur-3xl" />
        <div className="relative border border-amber-400/20 rounded-3xl p-12 bg-white/2">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            {user ? "Ready to take control of your money?" : "Start your financial journey today"}
          </h2>
          <p className="text-white/40 mb-8 max-w-sm mx-auto">
            {user
              ? "Head to your dashboard and see everything at a glance — balances, transactions, and more."
              : "Join Banking System for free and experience banking that's built around you — fast, secure, and transparent."}
          </p>
          {user ? (
            <Link to="/dashboard" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black px-8 py-3.5 rounded-xl font-bold transition-all duration-200 hover:scale-105 shadow-lg shadow-amber-500/30">
              Go to Dashboard <RiArrowRightLine size={18} />
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black px-8 py-3.5 rounded-xl font-bold transition-all duration-200 hover:scale-105 shadow-lg shadow-amber-500/30">
                Create Free Account <RiArrowRightLine size={18} />
              </Link>
              <Link to="/login" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-200">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTABanner;