import React, { useEffect, useState } from 'react'
import request from '../utils/request'

const getTopic = () => {
    const [topics, setTopics] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await request("/topic.json")
                setTopics(res?.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    })
    return topics
}

export default getTopic