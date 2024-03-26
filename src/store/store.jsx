import { configureStore } from "@reduxjs/toolkit";
import topicsSlice from "../slice/topicsSlice";
import leadersSlice from "../slice/leaderSlice";
import categoriesSlice from "../slice/categoriesSlice";
import authSlice from "../slice/authSlice";
import usersSlice from "../slice/usersSlice";
const store = configureStore({
  reducer: {
    topics: topicsSlice,
    auth: authSlice,
    users: usersSlice,
    leaders: leadersSlice,
    categories: categoriesSlice,
  },
});
export default store;
