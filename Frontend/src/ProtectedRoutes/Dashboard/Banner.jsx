import React from "react";
import { RiExchangeLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  return (
    <div className="bg-linear-to-r from-amber-400/10 via-amber-400/5 to-transparent border border-amber-400/15 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <p className="text-amber-400 text-xs font-medium tracking-widest uppercase mb-1">
          Good morning 👋
        </p>
        <h1 className="text-2xl font-bold text-white">{user.name}</h1>
        <p className="text-white/40 text-sm mt-1">
          Here's what's happening with your account today.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
        onClick={()=>navigate("/transaction")}
        className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <RiExchangeLine size={15} /> New Transfer
        </button>
      </div>
    </div>
  );
};

export default Banner;
