import { createSlice } from "@reduxjs/toolkit";

const topicSlice = createSlice({
    name: "topics",
    initialState: {
        topics: null
    },
    reducers: {
        listTopic: (state, action) => {
            state.topics = action.payload
        }
    }
})
export const { listTopic } = topicSlice.actions
export default topicSlice.reducer