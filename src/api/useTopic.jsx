import request from '../utils/request'

const useTopic = () => {
    const postTopic = async (data) => {
        try {
            await request.post("/topic.json", { data })
        } catch (error) {
            console.log(error)
        }
    }
    const putTopic = async (data) => {
        try {
            await request.put("/topic.json", { data })
        } catch (error) {
            console.log(error)
        }
    }
    return { postTopic, putTopic }
}
export default useTopic