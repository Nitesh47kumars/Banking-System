import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserAccount, getUserAccount, getUserBalance } from "../api/axios";

const initialState = {
  account: null,       // null = unknown/no account, object = has account
  balance: null,
  loading: false,
  error: null,
};

export const fetchAccount = createAsyncThunk(
  "account/fetchAccount",
  async (_, thunkAPI) => {
    try {
      const res = await getUserAccount();
      return res.data.data[0] ?? null;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const createAccount = createAsyncThunk(
  "account/createAccount",
  async (_, thunkAPI) => {
    try {
      const res = await createUserAccount();
      return res.data.data;
    } catch (err) {
      if (err.response?.status === 409) {
        const existing = await getUserAccount();
        return existing.data.data[0];
      }
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const fetchBalance = createAsyncThunk(
  "account/fetchBalance",
  async (accountId, thunkAPI) => {
    try {
      const res = await getUserBalance(accountId);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // FETCH ACCOUNT
      .addCase(fetchAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload;
      })
      .addCase(fetchAccount.rejected, (state, action) => {
        state.loading = false;
        state.account = null;
        state.error = action.payload;
      })

      // CREATE ACCOUNT
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH BALANCE
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default accountSlice.reducer;