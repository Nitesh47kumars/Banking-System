import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessOverlay = ({ receipt, setReceipt, setForm }) => {
  const navigate = useNavigate();
  return (
    <div className="absolute inset-0 z-50 bg-slate-900 flex flex-col p-6 animate-in fade-in zoom-in duration-300">
      {/* Header */}
      <div className="flex flex-col items-center justify-center pt-8 pb-6">
        <div className="w-16 h-16 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">
          Transaction Successful!
        </h2>
      </div>

      {/* Transaction Details Card */}
      <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-4 relative overflow-hidden">
        {/* Decorative dots for "Receipt" look */}
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-900 rounded-full border-r border-slate-800"></div>
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-900 rounded-full border-l border-slate-800"></div>

        <div className="flex justify-between items-center">
          <span className="text-slate-500 text-xs uppercase tracking-widest font-bold">
            Amount Paid
          </span>
          <span className="text-xl font-mono font-bold text-amber-500">
            ₹{(receipt.amount || 0).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="border-t border-slate-800/50 pt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">To Account</span>
            <span className="text-slate-200 font-mono text-xs truncate ml-4">
              {receipt.toAccount}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Transaction ID</span>
            <span className="text-slate-200 font-mono text-[10px] uppercase">
              {receipt._id}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Date & Time</span>
            <span className="text-slate-200 text-xs text-right">
              {new Date(receipt.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <p className="text-[10px] text-slate-600 text-center mt-6 uppercase tracking-tighter">
        Ref: {receipt.idempotencyKey}
      </p>
      <div className="flex flex-col gap-4 mt-auto w-full">
        <button
          onClick={() => {
            setReceipt(null);
            setForm({ toAccount: "", amount: "" });
            navigate("/transaction");
          }}
          className="w-full py-4 rounded-2xl font-bold tracking-wide 
            bg-amber-400 text-slate-900 
            hover:bg-amber-300 
            shadow-[0_8px_30px_rgba(251,191,36,0.25)]
            hover:shadow-[0_10px_40px_rgba(251,191,36,0.35)]
            transition-all duration-300 active:scale-95"
        >
          Make Another Transaction
        </button>

        {/* DASHBOARD */}
        <button
          onClick={() => {
            setReceipt(null);
            setForm({ toAccount: "", amount: "" });
            navigate("/dashboard");
          }}
          className="w-full py-4 rounded-2xl font-bold tracking-wide 
            border border-amber-400/30 
            text-amber-400 
            bg-transparent 
            hover:bg-amber-400/10 
            hover:text-amber-300
            transition-all duration-300 active:scale-95"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccessOverlay;
