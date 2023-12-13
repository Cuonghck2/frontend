import { configureStore } from "@reduxjs/toolkit";
import topicsSlice from "../slice/topicsSlice"

const store = configureStore({
    reducer: {
        topics: topicsSlice,
    }
})
export default store