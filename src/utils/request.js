import axios from "axios";

const request = axios.create({
  baseURL: "https://managementtopic-6e562-default-rtdb.firebaseio.com",
  params: {
    key: "AIzaSyB5oVqICoJbGcUlRWixGzcEo9LgXz0FM0o",
  },
});
export default request;
