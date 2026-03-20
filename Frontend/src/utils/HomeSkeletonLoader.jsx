const Shimmer = ({ className = "" }) => (
  <div className={`relative overflow-hidden bg-white/6 rounded-xl ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-linear-to-r from-transparent via-white/8 to-transparent" />
  </div>
);

const HomeSkeletonLoader = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white overflow-x-hidden">
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative text-center px-6 pt-32 pb-24 max-w-4xl mx-auto flex flex-col items-center">
        {/* ambient glows */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-150 h-100 rounded-full bg-amber-400/5 blur-[120px]" />

        {/* badge */}
        <Shimmer className="h-7 w-52 rounded-full mb-8" />

        {/* heading lines */}
        <Shimmer className="h-14 w-120 max-w-full rounded-2xl mb-4" />
        <Shimmer className="h-14 w-72 max-w-full rounded-2xl mb-8" />

        {/* subtext */}
        <Shimmer className="h-4 w-96 max-w-full rounded-lg mb-3" />
        <Shimmer className="h-4 w-72 max-w-full rounded-lg mb-10" />

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 w-full max-w-sm">
          <Shimmer className="h-12 flex-1 rounded-xl" />
          <Shimmer className="h-12 flex-1 rounded-xl" />
        </div>

        {/* trust badges */}
        <div className="flex flex-wrap justify-center gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Shimmer key={i} className="h-4 w-36 rounded-lg" />
          ))}
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="border-y border-white/10 bg-white/2 py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Shimmer className="h-9 w-24 rounded-lg" />
              <Shimmer className="h-3 w-28 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        {/* section heading */}
        <div className="flex flex-col items-center gap-3 mb-14">
          <Shimmer className="h-3 w-36 rounded-md" />
          <Shimmer className="h-9 w-72 rounded-xl" />
          <Shimmer className="h-4 w-80 rounded-lg" />
        </div>

        {/* feature cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white/3 border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
              <Shimmer className="h-11 w-11 rounded-xl" />
              <Shimmer className="h-5 w-40 rounded-lg" />
              <Shimmer className="h-3 w-full rounded-md" />
              <Shimmer className="h-3 w-4/5 rounded-md" />
            </div>
          ))}
        </div>
      </section>

      {/* ── QUICK ACTIONS ── */}
      <section className="pb-24 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-3 mb-14">
          <Shimmer className="h-3 w-28 rounded-md" />
          <Shimmer className="h-9 w-48 rounded-xl" />
          <Shimmer className="h-4 w-64 rounded-lg" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3 py-7 px-4 rounded-2xl border border-white/10 bg-white/3">
              <Shimmer className="h-6 w-6 rounded-md" />
              <Shimmer className="h-4 w-20 rounded-lg" />
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-white/2 border-y border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-3 mb-14">
            <Shimmer className="h-3 w-28 rounded-md" />
            <Shimmer className="h-9 w-64 rounded-xl" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white/3 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                <Shimmer className="h-3 w-full rounded-md" />
                <Shimmer className="h-3 w-5/6 rounded-md" />
                <Shimmer className="h-3 w-4/6 rounded-md" />
                <div className="flex items-center gap-3 mt-2">
                  <Shimmer className="h-9 w-9 rounded-full shrink-0" />
                  <div className="flex flex-col gap-2 flex-1">
                    <Shimmer className="h-3 w-24 rounded-md" />
                    <Shimmer className="h-3 w-16 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 border-y border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-3 mb-14">
            <Shimmer className="h-3 w-36 rounded-md" />
            <Shimmer className="h-9 w-72 rounded-xl" />
            <Shimmer className="h-4 w-80 rounded-lg" />
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <Shimmer className="h-14 w-14 rounded-full" />
                <Shimmer className="h-4 w-32 rounded-lg" />
                <Shimmer className="h-3 w-full rounded-md" />
                <Shimmer className="h-3 w-4/5 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="border border-white/10 rounded-3xl p-12 bg-white/2 flex flex-col items-center gap-5">
            <Shimmer className="h-9 w-96 max-w-full rounded-xl" />
            <Shimmer className="h-4 w-72 max-w-full rounded-lg" />
            <Shimmer className="h-4 w-56 max-w-full rounded-lg" />
            <div className="flex gap-4 mt-2">
              <Shimmer className="h-12 w-44 rounded-xl" />
              <Shimmer className="h-12 w-28 rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Shimmer className="h-6 w-24 rounded-lg" />
          <Shimmer className="h-3 w-48 rounded-md" />
          <div className="flex gap-5">
            <Shimmer className="h-3 w-12 rounded-md" />
            <Shimmer className="h-3 w-10 rounded-md" />
            <Shimmer className="h-3 w-14 rounded-md" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeSkeletonLoader;