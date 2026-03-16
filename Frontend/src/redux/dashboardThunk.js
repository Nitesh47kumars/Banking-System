import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "./authSlice";
import { createAccount, fetchBalance } from "./accountSlice";
import { fetchTransactions } from "./transactionSlice";

export const initializeDashboard = createAsyncThunk(
  "dashboard/init",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;

    const user = await dispatch(getUser()).unwrap();

    const account = await dispatch(createAccount()).unwrap();

    await dispatch(fetchBalance(account._id));

    await dispatch(fetchTransactions());

    return true;
  }
);