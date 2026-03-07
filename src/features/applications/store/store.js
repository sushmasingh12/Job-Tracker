import { configureStore } from "@reduxjs/toolkit";
import applicationsReducer from "./applicationsSlice";

const store = configureStore({
  reducer: {
    applications: applicationsReducer,
  },
});

export default store;