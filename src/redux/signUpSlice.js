import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Async Thunk for SignUp API Call
export const signUpUser = createAsyncThunk("signUp/signUpUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch("https://67ee3137c11d5ff4bf78a6d8.mockapi.io/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error("SignUp failed");

    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// ✅ SignUp Slice
const signUpSlice = createSlice({
  name: "signUp",
  initialState: { loading: false, error: null, success: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// ✅ Export Reducer
export default signUpSlice.reducer;
