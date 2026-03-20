import { RiBankLine, RiExternalLinkLine } from "react-icons/ri";

const HomeFooter = () => {
  return (
    <footer className="border-t border-white/10 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-amber-400 font-extrabold text-lg">
          <RiBankLine size={20} /> Banking System
        </div>
        <p className="text-xs text-white/30">© 2026 Banking System. All rights reserved.</p>
        <a
          href="https://portfolio-ten-jade-21.vercel.app/"
          target="_blank"
          className="flex items-center gap-1.5 text-xs text-amber-400/70 hover:text-amber-400 transition-colors"
        >
          Built by Developer <RiExternalLinkLine size={12} />
        </a>
      </div>
    </footer>
  );
};

export default HomeFooter;