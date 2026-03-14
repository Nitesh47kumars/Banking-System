import React from "react";

const NavbarLoader = () => {
  return (
    <>
      <>
        <div className="flex items-center gap-2.5 border border-white/8 rounded-xl px-1 pr-2.5 py-1 animate-pulse">
          <div className="w-7 h-7 rounded-lg bg-white/10"></div>
          <div className="hidden sm:block w-14 h-3 rounded bg-white/10"></div>
        </div>

        <div className="flex items-center gap-1.5 px-3 h-9 rounded-xl border border-white/10 animate-pulse">
          <div className="w-4 h-4 rounded bg-white/10"></div>
          <div className="w-12 h-3 rounded bg-white/10"></div>
        </div>
      </>
    </>
  );
};

export default NavbarLoader;
