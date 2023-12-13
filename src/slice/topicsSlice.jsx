import { createSlice } from "@reduxjs/toolkit";


const topicsSlice = createSlice({
    name: "topics",
    initialState: {
        topics: []
    },
    reducers: {
        listTopics: (state, action) => {
            state.topics = action.payload
        },
        addTopic: (state, action) => {
            state.topics.push(action.payload)
        }
    }
})

export const { listTopics, addTopic } = topicsSlice.actions
export default topicsSlice.reducer