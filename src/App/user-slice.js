import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export const googleSignIn = createAsyncThunk(
  "users/googleSignInStatus",
  async () => {
    const payload = await signInWithPopup(auth, provider);
    return payload.user;
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: { loading: false },
  reducers: {
    signIn: (state, action) => {
      state.value = action.payload;
    },
    signOut: (state) => {
      state.value = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      googleSignIn.fulfilled,
      (state, action) => {
        state.value = action.payload;
      },
      signOut.fulfilled,
      (state) => {
        state.value = null;
      }
    );
  },
});

export const { signIn, signOut } = UserSlice.actions;
export default UserSlice.reducer;
