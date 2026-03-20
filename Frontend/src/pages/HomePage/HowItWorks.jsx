const steps = [
  {
    num: "01",
    title: "Register Yourself",
    desc: "Create an account with your name, email and a secure password in under a minute.",
  },
  {
    num: "02",
    title: "Create an Account",
    desc: "A wallet account is automatically set up and ready to use right after registration.",
  },
  {
    num: "03",
    title: "Use Welcome Bonus",
    desc: "A demo balance is credited so you can explore transfers and features right away.",
  },
  {
    num: "04",
    title: "Send & Manage",
    desc: "Transfer funds to other users, track your history, and monitor your balance.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-6 bg-white/2 border-y border-white/10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-amber-400 text-xs uppercase tracking-widest font-semibold mb-3">
            Simple Onboarding
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Up and running in minutes
          </h2>
          <p className="text-white/40 max-w-md mx-auto">
            No paperwork. No branches. Just a few taps and you're fully set up.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-linear-to-r from-transparent via-amber-400/40 to-transparent" />
          {steps.map((s) => (
            <div key={s.num} className="relative text-center">
              <div className="w-14 h-14 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-4 text-amber-400 font-extrabold text-sm z-10 relative">
                {s.num}
              </div>
              <h3 className="font-bold mb-2 text-sm">{s.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
