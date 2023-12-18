import request from '../utils/request'

const useTopic = () => {
    const postTopic = async (data) => {
        try {
            await request.post("/topic.json", { data })
        } catch (error) {
            console.log(error)
        }
    }
    const putTopic = async (id, data) => {
        try {
            await request.put(`/topic/${id}.json`, { data })
        } catch (error) {
            console.log(error)
        }
    }
    const deleTopic = async (id) => {
        try {
            await request.delete(`/topic/${id}.json`)
        } catch (error) {
            console.log(error)

        }
    }
    return { postTopic, putTopic, deleTopic }
}
export default useTopic