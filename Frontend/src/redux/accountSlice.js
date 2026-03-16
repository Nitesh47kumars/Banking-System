import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserAccount, getUserAccount, getUserBalance } from "../api/axios";

const initialState = {
  account: null,
  balance: null,
  loading: false,
  error: null,
};

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
      return thunkAPI.rejectWithValue(err.message);
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
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createAccount.fulfilled, (state, action) => {
        state.account = action.payload;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
      });
  },
});

export default accountSlice.reducer;