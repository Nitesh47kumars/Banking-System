import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeDashboard } from "../../redux/authSlice";
import AccountCard from "./AccountCard";
import QuickInfo from "./QuickInfo";
import Loading from "../../utils/Loading";

import {
  RiArrowUpLine,
  RiArrowDownLine,
  RiWalletLine,
  RiExchangeLine,
} from "react-icons/ri";
import TransactionHistory from "./TransactionHistory";
import Banner from "./Banner";
import QuickActions from "./QuickAction";

const Dashboard = () => {
  const { user, account, balance, loading, transactionHistory } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeDashboard());
  }, []);

  console.log(transactionHistory);

  const quickStats = [
    {
      label: "Total Balance",
      value: balance?.balance,
      icon: RiWalletLine,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: "Monthly Income",
      value: balance?.totalCredit,
      icon: RiArrowDownLine,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Monthly Spent",
      value: balance?.totalDebit,
      icon: RiArrowUpLine,
      color: "text-rose-400",
      bg: "bg-rose-400/10",
    },
    {
      label: "Transactions",
      value: transactionHistory || 0,
      icon: RiExchangeLine,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {loading || !account || !user ? (
        <Loading />
      ) : (
        <>
          <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
            <Banner />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickStats.map((s) => (
                <QuickInfo key={s.label} {...s} />
              ))}
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              <TransactionHistory transactions={transactionHistory} />
              <AccountCard user={user} />
            </div>

            <QuickActions />
          </main>
        </>
      )}
    </div>
  );
};

export default Dashboard;
