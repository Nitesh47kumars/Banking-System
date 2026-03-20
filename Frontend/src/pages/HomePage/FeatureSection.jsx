import { Link } from "react-router-dom";
import {
  RiShieldCheckLine,
  RiLineChartLine,
  RiSendPlaneLine,
  RiPieChartLine,
  RiLayoutGridLine,
  RiGithubLine,
  RiBarChartGroupedLine,
  RiHistoryLine,
  RiUserLine,
} from "react-icons/ri";

const features = [
  {
    icon: <RiShieldCheckLine size={24} />,
    color: "text-emerald-400",
    glow: "shadow-emerald-500/20",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    title: "JWT Authentication",
    desc: "Secure login and session management using JSON Web Tokens stored in httpOnly cookies.",
  },
  {
    icon: <RiLineChartLine size={24} />,
    color: "text-blue-400",
    glow: "shadow-blue-500/20",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    title: "Transaction Tracking",
    desc: "View your full transaction history with filters by date, type, and amount.",
  },
  {
    icon: <RiSendPlaneLine size={24} />,
    color: "text-violet-400",
    glow: "shadow-violet-500/20",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    title: "Send & Receive Money",
    desc: "Transfer funds between registered users instantly via a clean, validated form flow.",
  },
  {
    icon: <RiPieChartLine size={24} />,
    color: "text-amber-400",
    glow: "shadow-amber-500/20",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    title: "Spending Breakdown",
    desc: "Visual charts powered by Recharts to help understand where your balance is going.",
  },
  {
    icon: <RiLayoutGridLine size={24} />,
    color: "text-rose-400",
    glow: "shadow-rose-500/20",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    title: "Responsive Dashboard",
    desc: "A clean, mobile-first UI built with React and Tailwind CSS that works on any screen.",
  },
  {
    icon: <RiGithubLine size={24} />,
    color: "text-cyan-400",
    glow: "shadow-cyan-500/20",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    title: "Open Source",
    desc: "Full source code available on GitHub — frontend, backend, and API docs included.",
  },
];

const highlights = [
  {
    avatar: "RD",
    color: "bg-violet-500",
    title: "Redux Toolkit",
    role: "State Management",
    text: "Global auth state, async thunks for API calls, and clean slice-based architecture throughout the app.",
  },
  {
    avatar: "RA",
    color: "bg-emerald-500",
    title: "REST API",
    role: "Express · MongoDB",
    text: "MVC-structured Node.js backend with Mongoose models, protected routes, and proper error handling.",
  },
  {
    avatar: "UI",
    color: "bg-amber-500",
    title: "UX Details",
    role: "Skeleton · Toasts · Guards",
    text: "Skeleton loaders on auth check, toast notifications for feedback, and route guards for protected pages.",
  },
];

const FeatureSection = () => {
  return (
    <>
      {/* Feature Cards */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-amber-400 text-xs uppercase tracking-widest font-semibold mb-3">
            What's Built
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Features at a glance
          </h2>
          <p className="text-white/40 max-w-md mx-auto">
            A full-stack banking demo covering auth, transfers, analytics and
            more.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className={`group bg-white/3 hover:bg-white/6 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${f.glow}`}
            >
              <div
                className={`w-11 h-11 rounded-xl ${f.bg} ${f.border} border flex items-center justify-center mb-4 ${f.color}`}
              >
                {f.icon}
              </div>
              <h3 className="font-bold text-base mb-2">{f.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Highlights (replaces fake testimonials) */}
      <section className="py-24 px-6 bg-white/2 border-y border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-400 text-xs uppercase tracking-widest font-semibold mb-3">
              Under the Hood
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Technical highlights
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((t) => (
              <div
                key={t.title}
                className="bg-white/3 border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
              >
                <p className="text-sm text-white/60 leading-relaxed">
                  {t.text}
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div
                    className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-xs font-bold text-black shrink-0`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.title}</p>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureSection;
