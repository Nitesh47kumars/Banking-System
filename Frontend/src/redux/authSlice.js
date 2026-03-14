import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, getUserData, logoutUser } from "../api/axios";

const initialState = {
  user: null,
  loading: true,
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
  async (_,thunkAPI) => {
    try {
      const response = await getUserData()
      return response.data.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const logout = createAsyncThunk(
  "auth/logout",
  async (_,thunkAPI) => {
    try {
      const response = await logoutUser()
      return response.data.data
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

      //getUserData
      .addCase(getUser.pending, (state)=>{
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action)=>{
        state.loading = false;
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
      })

      // LOGOUT
      .addCase(logout.pending, (state)=>{
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action)=>{
        state.loading = false;
        state.user = null
      })
      .addCase(logout.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
      })
  },
});


export default authSlice.reducer;
