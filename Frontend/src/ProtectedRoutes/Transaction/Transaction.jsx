import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeTransaction } from "../../redux/transactionSlice";
import SuccessOverlay from "./SuccessOverlay";
import TransactionButton from "../../Components/TransactionButton";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(null);

  const { loading, error } = useSelector((state) => state.transaction);

  
  const [form, setForm] = useState({
    toAccount: "",
    amount: "",
  });

  const idempotencyKey = useMemo(() => crypto.randomUUID(), [form.toAccount, form.amount]);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    return setForm((prev) => ({ ...prev, [name]: value }));
  };

  const quickAmounts = [100, 200, 500, 1000, 10000];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transaction = {
      toAccount: form.toAccount,
      amount: Number(form.amount),
      idempotencyKey
    };

    try {
      const result = await dispatch(
        initializeTransaction(transaction)
      ).unwrap();

      setReceipt(result);
    } catch (err) {
      const message = (await err.response?.data?.message) || err.message;
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen/90 bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-200">
      {/* Main Card */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Success State Overlay */}

        {receipt && (
          <SuccessOverlay
            receipt={receipt}
            setReceipt={setReceipt}
            setForm={setForm}
          />
        )}

        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-3 cursor-pointer py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-all text-slate-300 hover:text-white"
          >
            <RiArrowLeftLine size={18} />
          </button>

          <div className="flex items-center gap-2">
            <div className="px-4 h-8 uppercase bg-amber-500 rounded-lg flex items-center justify-center text-slate-900 font-bold">
              Banking System
            </div>
          </div>

          <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-full border border-emerald-500/20 uppercase font-bold tracking-widest text-center">
            Secure
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <h1 className="text-xl font-semibold text-white text-center">
              Send Money
            </h1>
            <p className="text-slate-500 text-sm text-center">
              Funds are transferred instantly to the recipient
            </p>
          </div>

          {/* Recipient Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Recipient
            </label>
            <div className="relative">
              <input
                name="toAccount"
                required
                type="text"
                placeholder="UPI ID or Account Number"
                value={form.toAccount}
                onChange={onHandleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition text-white"
              />
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Amount (INR)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-amber-500 font-semibold">
                ₹
              </span>
              <input
                name="amount"
                required
                type="number"
                placeholder="0.00"
                value={form.amount}
                onChange={onHandleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-8 pr-4 text-xl font-mono focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition text-white"
              />
            </div>

            {/* Quick Select Buttons */}
            <div className="flex gap-2 mt-2">
              {quickAmounts.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, amount: val.toString() }))
                  }
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition border border-slate-700"
                >
                  ₹{val >= 1000 ? `${val / 1000}K` : val}
                </button>
              ))}
            </div>
          </div>

          {/* Simple Summary */}
          <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Transfer Fee</span>
              <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">
                Free
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center">
              <span className="font-semibold text-sm">Total Payable</span>
              <span className="font-bold text-amber-500 text-lg">
                ₹{(parseFloat(form.amount) || 0).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
          {error?.message && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mt-3">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mt-0.5 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
                  />
                </svg>
                {/* <span className="font-semibold">Error:</span> */}
                <span className="text-sm">{error.message}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <TransactionButton loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default Transaction;
