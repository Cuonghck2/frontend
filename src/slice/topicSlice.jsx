import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    topics: null
}
const topicSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        listTopics: (state, action) => {
            state.topics = action.payload
        }
    },
})

export const { listTopics } = topicSlice.actions
export default topicSlice.reducer