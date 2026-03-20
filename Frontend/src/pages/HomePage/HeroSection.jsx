import { Link } from "react-router-dom";
import { RiArrowRightLine, RiCheckboxCircleLine } from "react-icons/ri";

const trustBadges = [
  "JWT Authentication",
  "REST API Backend",
  "Fully Responsive",
  "Open Source",
];
const stats = [
  { label: "Transactions Supported", value: "Send, Receive, Track" },
  { label: "Auth & Security", value: "JWT + Cookies" },
  { label: "Tech Stack", value: "React · Node · Mongo" },
  { label: "API Response", value: "< 200ms" },
];

const HeroSection = ({ user }) => {
  return (
    <>
      {/* Hero */}
      <section className="relative text-center px-6 pt-32 pb-24 max-w-4xl mx-auto">
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-150 h-100 rounded-full bg-amber-400/10 blur-[120px]" />
        <div className="pointer-events-none absolute top-10 left-10 w-64 h-64 rounded-full bg-violet-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute top-10 right-10 w-64 h-64 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Next-Gen Digital Banking
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
          {user ? (
            <>
              Welcome back,{" "}
              <span className="text-amber-400 italic">
                {user?.name?.split(" ")[0]}
              </span>
              <br />
              <span className="text-white/30">your money works smarter</span>
            </>
          ) : (
            <>
              Banking that{" "}
              <span className="text-amber-400 italic">works for you</span>
              <br />
              <span className="text-white/30">not against you</span>
            </>
          )}
        </h1>

        <p className="text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {user
            ? "Manage finances, track every transaction in real time, and send money anywhere on the planet — instantly and securely."
            : "Join millions who trust Banking System for secure transfers, smart analytics, and zero-fee global payments. Get started in minutes."}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-black px-7 py-3.5 rounded-xl font-bold transition-all duration-200 hover:scale-105 shadow-lg shadow-amber-500/25"
              >
                Go to Dashboard <RiArrowRightLine size={18} />
              </Link>
              <Link
                to="/transactions"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-200"
              >
                View Transactions
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-black px-7 py-3.5 rounded-xl font-bold transition-all duration-200 hover:scale-105 shadow-lg shadow-amber-500/25"
              >
                Create Free Account <RiArrowRightLine size={18} />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-200"
              >
                Login
              </Link>
            </>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs text-white/40">
          {trustBadges.map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <RiCheckboxCircleLine className="text-emerald-400" size={13} />{" "}
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <div className="border-y border-white/10 bg-white/2 py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-xl font-extrabold text-amber-400">{s.value}</p>
              <p className="text-xs text-white/40 mt-1 tracking-wide uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
