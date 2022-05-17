import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "./user-slice";

const store = configureStore({
  reducer: { user: userSlice },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
