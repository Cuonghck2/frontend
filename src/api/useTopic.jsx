import React, { useEffect, useState } from 'react'
import request from '../utils/request'
import { useDispatch } from 'react-redux'
import { listTopics } from '../slice/topicsSlice'

const useTopic = () => {
    const getTopic = () => {
        const dispatch = useDispatch()
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const res = await request("/topic.json")
                    dispatch(listTopics(Object.values(res?.data)))
                } catch (error) {
                    console.log(error)
                }
            }
            fetchData()
        }, [])
    }

    const postTopic = async (data) => {
        try {
            const res = await request.post("/topic.json", { data })
            return res
        } catch (error) {
            console.log(error)
        }

    }
    return { getTopic, postTopic }
}
export default useTopic