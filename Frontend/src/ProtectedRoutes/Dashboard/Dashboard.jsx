import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAccount,
  getBalance,
  getUser,
  initializeDashboard,
} from "../../redux/authSlice";
import DashboardSample from "./DashboardSample";
import AccountCard from "./AccountCard";
import QuickInfo from "./QuickInfo";

import {
  RiArrowUpLine,
  RiArrowDownLine,
  RiWalletLine,
  RiExchangeLine,
} from "react-icons/ri";

const Dashboard = () => {
  const { user, account, balance, loading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeDashboard());
  }, []);

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
  return (
    <div>
      {loading || !account || !user ? (
        <h1>Loading...</h1>
      ) : (
        <div className="bg-black">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStats.map((s) => (
              <QuickInfo key={s.label} {...s} />
            ))}
          </div>
          <DashboardSample />
        </div>
      )}
      <h1>asd</h1>
    </div>
  );
};

export default Dashboard;
