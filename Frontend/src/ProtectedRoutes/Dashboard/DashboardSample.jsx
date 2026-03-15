import React from "react";
import { useSelector } from "react-redux";
import {
  RiBankLine,
  RiUserLine,
  RiMailLine,
  RiCalendarLine,
  RiShieldCheckLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiMoreLine,
  RiLogoutBoxLine,
  RiWalletLine,
  RiExchangeLine,
  RiNotification3Line,
  RiIdCardLine,
  RiCopperCoinLine,
} from "react-icons/ri";

import Banner from "./Banner";
import QuickInfo from "./QuickInfo";

/* ── Mock data (replace with real API later) ── */
const mockTransactions = [
  {
    id: 1,
    title: "Netflix Subscription",
    type: "debit",
    amount: 649,
    date: "Mar 12",
    category: "Entertainment",
  },
  {
    id: 2,
    title: "Salary Credit",
    type: "credit",
    amount: 85000,
    date: "Mar 10",
    category: "Income",
  },
  {
    id: 3,
    title: "Amazon Purchase",
    type: "debit",
    amount: 2340,
    date: "Mar 9",
    category: "Shopping",
  },
  {
    id: 4,
    title: "Freelance Payment",
    type: "credit",
    amount: 15000,
    date: "Mar 7",
    category: "Income",
  },
  {
    id: 5,
    title: "Electricity Bill",
    type: "debit",
    amount: 1200,
    date: "Mar 5",
    category: "Utilities",
  },
];

const quickStats = [
  {
    label: "Total Balance",
    value: "₹1,24,530",
    icon: RiWalletLine,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    label: "Monthly Income",
    value: "₹1,00,000",
    icon: RiArrowDownLine,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    label: "Monthly Spent",
    value: "₹18,430",
    icon: RiArrowUpLine,
    color: "text-rose-400",
    bg: "bg-rose-400/10",
  },
  {
    label: "Transactions",
    value: "24",
    icon: RiExchangeLine,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
];

/* ── Reusable stat card ── */
const StatCard = ({ label, value, icon: Icon, color, bg, change }) => (
  <div className="bg-white/3 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-10 h-10 ${bg} rounded-xl grid place-items-center`}>
        <Icon size={18} className={color} />
      </div>
      <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded-full">
        {change}
      </span>
    </div>
    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
      {label}
    </p>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

/* ── Transaction row ── */
const TxRow = ({ title, type, amount, date, category }) => (
  <div className="flex items-center justify-between py-3.5 border-b border-white/5 last:border-0 group">
    <div className="flex items-center gap-3">
      <div
        className={`w-9 h-9 rounded-xl grid place-items-center shrink-0 ${
          type === "credit" ? "bg-emerald-400/10" : "bg-rose-400/10"
        }`}
      >
        {type === "credit" ? (
          <RiArrowDownLine size={15} className="text-emerald-400" />
        ) : (
          <RiArrowUpLine size={15} className="text-rose-400" />
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-white/85">{title}</p>
        <p className="text-xs text-white/30">
          {category} · {date}
        </p>
      </div>
    </div>
    <span
      className={`text-sm font-semibold ${
        type === "credit" ? "text-emerald-400" : "text-rose-400"
      }`}
    >
      {type === "credit" ? "+" : "-"}₹{amount.toLocaleString()}
    </span>
  </div>
);

/* ── Main DashboardSample ── */
const DashboardSample = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
          <p className="text-white/30 text-sm">Loading your account...</p>
        </div>
      </div>
    );
  }

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const joinDate = new Date(user.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* ── Page Content ── */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <Banner user={user} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((s) => (
            <QuickInfo key={s.label} {...s} />
          ))}
        </div>

        {/* Main Grid: Transactions + Profile */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Transactions — takes 2 cols */}
          <div className="lg:col-span-2 bg-white/3 border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-white">Recent Transactions</h2>
              <button className="text-xs text-amber-400 hover:text-amber-300 transition-colors">
                View all
              </button>
            </div>
            <div>
              {mockTransactions.map((tx) => (
                <TxRow key={tx.id} {...tx} />
              ))}
            </div>
          </div>

          {/* Profile card — 1 col */}
          <div className="bg-white/3 border border-white/5 rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="font-semibold text-white">Account Details</h2>

            {/* Avatar */}
            <div className="flex flex-col items-center gap-2 py-2">
              <div className="w-16 h-16 rounded-2xl bg-amber-400/15 text-amber-400 text-xl font-bold grid place-items-center">
                {initials}
              </div>
              <p className="font-semibold text-white">{user.name}</p>
              <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                <RiShieldCheckLine size={11} /> Verified
              </span>
            </div>

            {/* Info rows */}
            <div className="space-y-3 border-t border-white/5 pt-4">
              {[
                { icon: RiUserLine, label: "Full Name", value: user.name },
                { icon: RiMailLine, label: "Email", value: user.email },
                {
                  icon: RiIdCardLine,
                  label: "Account ID",
                  value: user._id?.slice(-8).toUpperCase(),
                  mono: true,
                },
                {
                  icon: RiCalendarLine,
                  label: "Member Since",
                  value: joinDate,
                },
              ].map(({ icon: Icon, label, value, mono }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-white/5 rounded-lg grid place-items-center shrink-0 mt-0.5">
                    <Icon size={13} className="text-white/40" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-white/30 mb-0.5">{label}</p>
                    <p
                      className={`text-sm text-white/80 truncate ${
                        mono ? "font-mono" : "font-medium"
                      }`}
                    >
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              icon: RiExchangeLine,
              label: "Transfer",
              color: "text-amber-400",
              bg: "bg-amber-400/10",
            },
            {
              icon: RiWalletLine,
              label: "Top Up",
              color: "text-emerald-400",
              bg: "bg-emerald-400/10",
            },
            {
              icon: RiCopperCoinLine,
              label: "Pay Bill",
              color: "text-blue-400",
              bg: "bg-blue-400/10",
            },
            {
              icon: RiMoreLine,
              label: "More",
              color: "text-violet-400",
              bg: "bg-violet-400/10",
            },
          ].map(({ icon: Icon, label, color, bg }) => (
            <button
              key={label}
              className="bg-white/3 hover:bg-white/6 border border-white/5 hover:border-white/10 rounded-2xl p-4 flex flex-col items-center gap-2.5 transition-colors group"
            >
              <div
                className={`w-10 h-10 ${bg} rounded-xl grid place-items-center`}
              >
                <Icon size={18} className={color} />
              </div>
              <span className="text-xs text-white/50 group-hover:text-white/80 transition-colors">
                {label}
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardSample;
