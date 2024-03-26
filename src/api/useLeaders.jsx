import request from "../utils/request";

const useLeaders = () => {
  const postLeaders = async (data) => {
    console.log(data);
    try {
      await request.post("/api/topicLeader", data);
    } catch (error) {
      console.log(error);
    }
  };
  const putLeaders = async (id, data) => {
    try {
      await request.put(`/topicLeader/${id}`, { data });
    } catch (error) {
      console.log(error);
    }
  };
  const deleLeaders = async (id) => {
    try {
      await request.delete(`/api/topicLeader/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return { postLeaders, putLeaders, deleLeaders };
};
export default useLeaders;
