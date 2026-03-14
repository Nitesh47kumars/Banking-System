import React, { useEffect } from "react";
import { RiBankLine, RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../redux/authSlice";
import NavbarLoader from "../utils/NavbarLoader";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const onHandleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0b]/90 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-amber-400 rounded-lg grid place-items-center">
          <RiBankLine size={15} className="text-black" />
        </div>
        <span className="font-bold text-white text-base tracking-tight">
          BankX
        </span>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {loading ? (
          <NavbarLoader />
        ) : user ? (
          <>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2.5 border border-white/8 rounded-xl px-1 pr-2.5 py-1"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 text-xs font-bold grid place-items-center">
                {initials}
              </div>
              <span className="text-sm text-white/70 hidden sm:block">
                {user.name.split(" ")[0]}
              </span>
            </button>

            <button
              onClick={onHandleLogout}
              className="flex items-center gap-1.5 px-3 h-9 rounded-xl border border-white/10 text-white/60 hover:text-rose-400 hover:border-rose-500/40 hover:bg-linear-to-r hover:from-rose-500/10 hover:to-transparent transition-all duration-200"
            >
              <RiLogoutBoxLine size={16} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </>
        ) : (
          <>
            {/* Login */}
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm border border-white/10 rounded-lg text-white/70 hover:text-white hover:border-white/30 transition"
            >
              Login
            </button>

            {/* Create Account */}
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 text-sm bg-amber-400 text-black rounded-lg font-medium hover:bg-amber-300 transition"
            >
              Create Account
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
