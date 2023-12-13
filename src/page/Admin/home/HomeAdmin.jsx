
import React from 'react'
import request from '../../../utils/request'

const HomeAdmin = () => {
    const postTopic = async (data) => {
        try {
            const res = await request.get("/test/list.json")
            const data = res.data
            const value = Object.values(data)
            console.log(value)


            return res
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div style={{ cursor: "pointer" }} onClick={postTopic}>
            HomeAdmin
        </div>
    )
}

export default HomeAdmin