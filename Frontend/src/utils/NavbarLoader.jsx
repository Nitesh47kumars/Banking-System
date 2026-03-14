import React from "react";

const NavbarLoader = () => {
  return (
    <>
      <div className="w-9 h-9 rounded-xl border border-white/8 bg-white/5 animate-pulse"></div>

      <div className="flex items-center gap-2.5 border border-white/8 rounded-xl px-3 py-1.5">
        <div className="w-7 h-7 rounded-lg bg-white/10 animate-pulse"></div>
        <div className="w-16 h-3 rounded bg-white/10 animate-pulse hidden sm:block"></div>
      </div>

      <div className="w-9 h-9 rounded-xl border border-white/8 bg-white/5 animate-pulse"></div>
    </>
  );
};

export default NavbarLoader;
