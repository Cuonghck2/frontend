import { createSlice } from "@reduxjs/toolkit";


const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        isLogin: false
    },
    reducers: {
        listUsers: (state, action) => {
            state.users = action.payload
        },
        login: (state, action) => {
            state.isLogin = action.payload
        },
        addUser: (state, action) => {
            const data = action.payload;
            const newData = {
                data: data
            }
            state.users.push(newData)
            state.isLogin = action.payload
        },
        editUser: (state, action) => {
            const findData = state.users.find((item) => {
                return item.id === action.payload.id
            })
            if (findData) {
                findData.data.data = action.payload.data
            }
        },
        deleteUsers: (state, action) => {
            const index = state.users.findIndex((item) => {
                return item.id === action.payload
            })
            if (index !== -1) {
                state.users.splice(index, 1)
            }
        }
    }
})

export const { listUsers, login, addUser, editUser, deleteUsers } = usersSlice.actions
export default usersSlice.reducer