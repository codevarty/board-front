import axios from "axios";

const MyAxios = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 5000,
});

MyAxios.interceptors.request.use(
    (config) => {
        
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

MyAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("응답 에러 :", error);
        return Promise.reject(error);
    }
)

export default MyAxios;