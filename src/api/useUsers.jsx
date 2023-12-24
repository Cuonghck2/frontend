import { data } from 'autoprefixer';
import request from '../utils/request';

const useUser = () => {
    const postUser = async (data) => {
        try {
            await request.post("/users.json", { data })
        } catch (error) {
            console.log(error)
        }
    }
    const putUser = async (data, id) => {
        try {
            await request.put(`/users/${id}.json`, { data })
        } catch (error) {

        }
    }
    const delUser = async (id) => {
        try {
            await request.delete(`/users/${id}.json`)
        } catch (error) {

        }
    }
    return { postUser, putUser, delUser }
}

export default useUser