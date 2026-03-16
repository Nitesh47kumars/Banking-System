import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateUserInitialFunds, getUserTransactionHistory } from "../api/axios";

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

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
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
      .addCase(createInitialFunds.pending, (state)=>{
        state.loading = true;
      })
      .addCase(createInitialFunds.fulfilled, (state, action)=>{
        state.loading = false;
      })
      .addCase(createInitialFunds.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default transactionSlice.reducer;