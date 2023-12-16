import request from '../utils/request'

const useTopic = () => {
    const postTopic = async (data) => {
        try {
            const res = await request.post("/topic.json", { data })
            return res
        } catch (error) {
            console.log(error)
        }

    }
    return { postTopic }
}
export default useTopic