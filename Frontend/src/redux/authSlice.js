import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser, getUserData } from "../api/axios";

const initialState = {
  user: null,
  loading: false,
  authChecked: false,
  error: null,
};

export const register = createAsyncThunk("auth/register", async (formData, thunkAPI) => {
  try {
    const res = await registerUser(formData);
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const login = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
  try {
    const res = await loginUser(formData);
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await logoutUser();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const res = await getUserData();
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => { state.loading = true })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.authChecked = true
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
});

export default authSlice.reducer;