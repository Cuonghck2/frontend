import { configureStore } from "@reduxjs/toolkit";
import topicsSlice from "../slice/topicsSlice"
import usersSlice from "../slice/usersSlice"
const store = configureStore({
    reducer: {
        topics: topicsSlice,
        users: usersSlice,
    }
})
export default store