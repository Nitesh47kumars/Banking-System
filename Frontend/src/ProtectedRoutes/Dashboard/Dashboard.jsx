import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountCard from "./AccountCard";
import QuickInfo from "./QuickInfo";
import Banner from "./Banner";
import QuickActions from "./QuickAction";
import { useNavigate } from "react-router-dom";
import { fetchAccount, fetchBalance } from "../../redux/accountSlice";
import { fetchTransactions } from "../../redux/transactionSlice";
import RecentTransactions from "../Transaction/TransactionHistory/RecentTransactions";
import CreateAccount from "./AccountCreation";
import DashboardSkeleton from "../../utils/DashboardSkeleton";

import {
  RiArrowUpLine,
  RiArrowDownLine,
  RiWalletLine,
  RiExchangeLine,
} from "react-icons/ri";

const Dashboard = () => {
  const user = useSelector((state) => state.auth?.user);
  const { account, loading } = useSelector((state) => state.account);
  const balance = useSelector((state) => state.account.balance);
  const transactions = useSelector((state) => state.transaction.transactions);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(fetchAccount());
  }, [user]);

  useEffect(() => {
    if (!account?._id) return;
    dispatch(fetchBalance(account._id));
    dispatch(fetchTransactions());
  }, [account?._id]);

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

        {loading ? (
          <DashboardSkeleton />
        ) : !account ? (
          <CreateAccount />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickStats.map((s) => (
                <QuickInfo key={s.label} {...s} />
              ))}
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              <RecentTransactions transactions={transactions} />
              <AccountCard user={user} />
            </div>
            <QuickActions />
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
