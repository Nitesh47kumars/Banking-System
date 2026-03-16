import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeDashboard } from "../../redux/dashboardThunk";
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
import { useNavigate } from "react-router-dom";
import { fetchBalance } from "../../redux/accountSlice";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const account = useSelector((state) => state.account.account);
  const balance = useSelector((state) => state.account.balance);
  const transactions = useSelector((state) => state.transaction.transactions);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      dispatch(fetchBalance(user.accountId)).unwrap();
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (loading) return <Loading />;

  const quickStats = [
    {
      label: "Total Balance",
      value: balance?.balance || 0,
      icon: RiWalletLine,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: "Monthly Income",
      value: balance?.totalCredit || 0,
      icon: RiArrowDownLine,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Monthly Spent",
      value: balance?.totalDebit || 0,
      icon: RiArrowUpLine,
      color: "text-rose-400",
      bg: "bg-rose-400/10",
    },
    {
      label: "Transactions",
      value: transactions?.length || 0,
      icon: RiExchangeLine,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <Banner user={user} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((s) => (
            <QuickInfo key={s.label} {...s} />
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <TransactionHistory transactions={transactions} />
          <AccountCard user={user} account={account} />
        </div>

        <QuickActions />
      </main>
    </div>
  );
};

export default Dashboard;
