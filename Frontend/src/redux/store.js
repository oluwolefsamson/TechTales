import { configureStore } from "@reduxjs/toolkit";
import specialtyReducer from "./userRelated/specialtySlice";
import authReducer from "./userRelated/authSlice";

const store = configureStore({
  reducer: {
    specialty: specialtyReducer,
    auth: authReducer,
  },
});

export default store;
