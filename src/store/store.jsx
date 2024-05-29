import { configureStore } from "@reduxjs/toolkit";
import topicsSlice from "../slice/topicsSlice";
import leadersSlice from "../slice/leaderSlice";
import categoriesSlice from "../slice/categoriesSlice";
import authSlice from "../slice/authSlice";
import usersSlice from "../slice/usersSlice";
import memberSlice from "../slice/memberSlice";
import docsSlice from "../slice/docsSlice";
const store = configureStore({
  reducer: {
    topics: topicsSlice,
    auth: authSlice,
    users: usersSlice,
    leaders: leadersSlice,
    members: memberSlice,
    categories: categoriesSlice,
    docs: docsSlice,
  },
});
export default store;
