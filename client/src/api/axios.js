import axios from 'axios';
const BASE_URL = 'https://5b7a-203-77-246-210.ap.ngrok.io';

axios.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        if (err.response) {
            console.log(err.response);
            console.error(err.response.data.message);
            return Promise.reject(err.response)
        }
        else {
            return Promise.reject({ status: 500, data: { message: "No Server Response" } })
        }
    }
);

export default axios.create({
    baseURL: BASE_URL,
    headers: {"ngrok-skip-browser-warning":true}
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    withCredentials: true
});

axiosPrivate.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        if (err.response) {
            console.error(err.response.data.message);
            return Promise.reject(err.response)
        }
        else {
            return Promise.reject({ status: 500, data: { message: "No Server Response" } })
        }
    }
);