import { configureStore } from '@reduxjs/toolkit'
import { listTopics } from '../slice/topicSlice'

const store = configureStore({
    reducer: {
        listTopics
    },
})

export default store