import React from "react";
import {
  RiBankLine,
  RiShieldCheckLine,
  RiArrowRightLine,
  RiLockLine,
  RiExchangeLine,
  RiWalletLine,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "../../redux/accountSlice";

const features = [
  { icon: RiWalletLine, label: "Instant balance tracking" },
  { icon: RiExchangeLine, label: "Send & receive money" },
  { icon: RiShieldCheckLine, label: "Bank-grade security" },
  { icon: RiLockLine, label: "Zero-fee transactions" },
];

const AccountCreation = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.account);

  const onHandleSubmit = async () => {
    try {
      await dispatch(createAccount()).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative bg-white/3 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md hover:border-white/10 transition-all duration-300">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)",
        }}
      />

      <div className="relative p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 grid place-items-center">
              <RiBankLine size={18} className="text-amber-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white leading-tight">
                Open Your Account
              </h2>
              <p className="text-xs text-white/30 mt-0.5">
                Free · Takes 2 seconds
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/15 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available
          </span>
        </div>

        <div className="border-t border-white/5" />

        {/* Feature grid */}
        <div className="grid grid-cols-2 gap-2">
          {features.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 bg-white/3 border border-white/5 rounded-xl px-3 py-2.5 hover:bg-white/5 transition-colors"
            >
              <div className="w-6 h-6 rounded-md bg-amber-400/10 grid place-items-center shrink-0">
                <Icon size={12} className="text-amber-400/70" />
              </div>
              <span className="text-xs text-white/50">{label}</span>
            </div>
          ))}
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-start gap-2 bg-red-500/8 border border-red-500/15 rounded-xl px-4 py-3">
            <span className="text-red-400 text-xs leading-relaxed">
              {error.message || "Something went wrong. Please try again."}
            </span>
          </div>
        )}

        {/* CTA button */}
        <button
          onClick={onHandleSubmit}
          disabled={loading}
          className={`group relative cursor-pointer w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200
            ${
              loading
                ? "bg-white/5 text-white/25 cursor-not-allowed border border-white/5"
                : "bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-lg shadow-amber-500/15 active:scale-[0.98]"
            }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white/30"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span>Creating account…</span>
            </>
          ) : (
            <>
              <RiBankLine size={16} />
              <span>Create Free Account</span>
              <RiArrowRightLine
                size={15}
                className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
              />
            </>
          )}
        </button>

        {/* Fine print */}
        <p className="text-center text-xs text-white/20 -mt-2">
          No fees · No minimum balance · Instant setup
        </p>
      </div>
    </div>
  );
};

export default AccountCreation;
