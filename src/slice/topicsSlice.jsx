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
            let findData = state.topics.find((item) => {
                return item.id === action.payload.id
            });
            if (findData) {
                findData.data.data = action.payload.data;
            }
        },
        deleteTopic: (state, action) => {
            let index = state.topics.findIndex((item) => {
                return item.id === action.payload
            });
            if (index !== -1) {
                state.topics.splice(index, 1)
            }
        }


    }
})

export const { listTopics, addTopic, updateTopic, deleteTopic } = topicsSlice.actions
export default topicsSlice.reducer