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
      console.log(res.data.data)
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
      // CREATE ACCOUNT
    .addCase(createAccount.pending, (state) => {
      state.loading = true;
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
    })
    .addCase(fetchBalance.fulfilled, (state, action) => {
      state.loading = false;
      state.balance = action.payload;
    })
    .addCase(fetchBalance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })


    

      // // InitializeDashboard
      // .addCase(initializeDashboard.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(initializeDashboard.fulfilled, (state) => {
      //   state.loading = false;
      // })
      // .addCase(initializeDashboard.rejected, (state) => {
      //   state.loading = false;
      // });
  },
});

export default accountSlice.reducer;