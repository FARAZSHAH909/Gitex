import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Async Thunk for Login API Call
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    // 🔹 Fetch all registered users from MockAPI
    const response = await fetch("https://67ee3137c11d5ff4bf78a6d8.mockapi.io/signup");

    if (!response.ok) throw new Error("Failed to fetch users");

    const users = await response.json();

    // 🔹 Check if user exists with correct password
    const user = users.find(
      (u) => u.username === userData.username && u.password === userData.password
    );

    if (!user) {
      throw new Error("Invalid username or password");
    }

    return user; // Return user data on successful login
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// ✅ Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export Actions & Reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
