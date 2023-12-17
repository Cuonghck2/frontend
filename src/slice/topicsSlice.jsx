import { createSlice, current } from "@reduxjs/toolkit";


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
        },
        updateTopic: (state, action) => {
            const updatedTopic = action.payload;
            const index = state.topics.findIndex((item) => item.idTopic === updatedTopic.id);
            if (index !== -1) {
                state.topics[index] = updatedTopic;
            }
        }

    }
})

export const { listTopics, addTopic, updateTopic } = topicsSlice.actions
export default topicsSlice.reducer