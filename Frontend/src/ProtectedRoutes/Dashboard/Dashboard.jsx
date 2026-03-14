import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAccount, getBalance, getUser } from "../../redux/authSlice";
import DashboardSample from "./DashboardSample";
import AccountCard from "./AccountCard";

const Dashboard = () => {
  const { user, account, balance, loading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (user && account === null) {
      dispatch(createAccount());
    }
  }, [user, account, dispatch]);

  // useEffect(() => {
  //   if (account?._id && !balance) {
  //     dispatch(getBalance(account._id));
  //   }
  // }, [account?._id, balance, dispatch]);

  console.log("ACCOUNT:", account);
  // console.log("Balance:", balance)
  return (
    <div>
      {loading || !account || !user ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <AccountCard user={user} account={account} />
          <DashboardSample />
        </>
      )}
      <h1>asd</h1>
    </div>
  );
};

export default Dashboard;
