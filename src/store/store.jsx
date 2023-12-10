import { configureStore } from "@reduxjs/toolkit";
import { listTopic } from "../slice/topicSlice";

const store = configureStore({
    reducer: {
        listTopic,
    }
})
export default store