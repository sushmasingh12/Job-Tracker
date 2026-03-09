import { configureStore } from "@reduxjs/toolkit";
import applicationsReducer from "./applicationsSlice";
import authReducer from "../../auth/store/authSlice";

const store = configureStore({
  reducer: {
    applications: applicationsReducer,
    auth: authReducer,
  },
});

export default store;

