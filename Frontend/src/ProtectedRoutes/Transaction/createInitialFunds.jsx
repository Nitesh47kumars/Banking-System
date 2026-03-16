import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createInitialFunds } from "../../redux/transactionSlice";

const CreateInitialFunds = () => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ toAccount: "", amount: "" });
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  const onHandleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createInitialFunds({
        toAccount: form.toAccount,
        amount: Number(form.amount),
        idempotencyKey,
      })).unwrap();
      setSuccess(true);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen/90 bg-slate-950 flex items-center justify-center p-4 text-slate-200">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl relative overflow-hidden">
        
        {success && (
          <div className="absolute inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Funds Created!</h2>
            <p className="text-slate-400 mt-2">₹{Number(form.amount).toLocaleString()} added to {form.toAccount}</p>
            <button onClick={() => { setSuccess(false); setForm({ toAccount: "", amount: "" }); }} className="mt-8 w-full py-3 bg-slate-800 rounded-xl text-white">Done</button>
          </div>
        )}

        <div className="p-6 border-b border-slate-800 bg-slate-800/30">
          <span className="font-semibold uppercase tracking-wide text-amber-500">System: Create Funds</span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">Initial Funding</h1>
            <p className="text-slate-500 text-sm">Inject system capital into a user account</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Target Account</label>
            <input name="toAccount" required value={form.toAccount} onChange={onHandleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white" placeholder="Account ID" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Amount (INR)</label>
            <input name="amount" type="number" required value={form.amount} onChange={onHandleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-xl text-white" placeholder="0.00" />
          </div>

          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded-xl uppercase transition">Confirm Creation</button>
        </form>
      </div>
    </div>
  );
};

export default CreateInitialFunds;