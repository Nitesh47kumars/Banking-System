import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  getUserData,
  logoutUser,
  getUserBalance,
  createUserAccount,
  getUserAccount,
  getUserTransactionHistory,
} from "../api/axios";

const initialState = {
  user: null,
  account: null,
  balance: null,
  loading: true,
  transactionHistory: [],
  authChecked: false,
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const response = await registerUser(formData);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const response = await loginUser(formData);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getuserdata",
  async (_, thunkAPI) => {
    try {
      const response = await getUserData();
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await logoutUser();
    return response.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const createAccount = createAsyncThunk(
  "auth/createaccount",
  async (_, thunkAPI) => {
    try {
      const response = await createUserAccount();
      return response.data.data;
    } catch (err) {
      if (err.response?.status === 409) {
        const existing = await getUserAccount();
        return existing.data.data[0];
      }
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const initializeDashboard = createAsyncThunk(
  "auth/initializeDashboard",
  async (_, thunkAPI) => {
    try {
      // 1. Get user
      const userRes = await getUserData();
      const user = userRes.data.data;

      // 2. Get or create account
      let account;
      try {
        const accountRes = await createUserAccount();
        account = accountRes.data.data;
      } catch (err) {
        if (err.response?.status === 409) {
          const existing = await getUserAccount();
          account = existing.data.data[0];
        } else throw err;
      }

      // 3. Get balance
      let balance = null;
      try {
        const balanceRes = await getUserBalance(account._id);
        balance = balanceRes.data.data;
      } catch (err) {
        console.warn("Balance fetch failed:", err.message);
      }

      //4. Transaction History
      let transactionHistory = [];
      try {
        const transactionHistoryRes = await getUserTransactionHistory();
        transactionHistory = transactionHistoryRes.data.data;
      } catch (err) {
        console.warn("Transaction History Failed:", err.message);
      }

      return { user, account, balance, transactionHistory };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getUser
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.authChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.authChecked = true;
      })

      // LOGOUT
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE ACCOUNT
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload || null;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(initializeDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.account = action.payload.account;
        state.balance = action.payload.balance;
        state.transactionHistory = action.payload.transactionHistory;
      })
      .addCase(initializeDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default authSlice.reducer;
