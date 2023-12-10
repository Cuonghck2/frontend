import React, { useEffect, useState } from 'react'
import request from '../utils/request';

const getUser = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await request("/users.json")
                setUsers(res?.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    return users
}

export default getUser