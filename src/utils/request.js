import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Lấy mã thông báo từ local storage (hoặc từ nơi lưu trữ khác)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Bổ sung header Authorization
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // Xử lý lỗi mã thông báo (token)
      // Redirect hoặc xử lý lại đăng nhập
      console.log("Token error:", error.response.data);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
