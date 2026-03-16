import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateUserInitialFunds,
  getUserTransactionHistory,
  makeTransaction,
} from "../api/axios";

const initialState = {
  transactions: [],
  loading: false,
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async (_, thunkAPI) => {
    try {
      const res = await getUserTransactionHistory();
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const createInitialFunds = createAsyncThunk(
  "transaction/createinitialfunds",
  async (transaction, thunkAPI) => {
    try {
      const res = await CreateUserInitialFunds(transaction);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const initializeTransaction = createAsyncThunk(
  "transactions/transaction",
  async (transaction, thunkAPI) => {
    try {
      const res = await makeTransaction(transaction);
      console.log(res.data)
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      //FETCH TRANSACTION
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //CREATE INITIAL FUNDS
      .addCase(createInitialFunds.pending, (state) => {
        state.loading = true;
      })
      .addCase(createInitialFunds.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createInitialFunds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // INITIALIZE TRANSACTION
      .addCase(initializeTransaction.pending, (state)=>{
        state.loading = true;
      })
      .addCase(initializeTransaction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(initializeTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default transactionSlice.reducer;
