import axios from 'axios';
import { baseURL } from "./api";

const instance = axios.create({
    baseURL,
    // timeout: 10000,
    headers: {
        'Access-Control-Allow-Origin': "*"
    }
})


instance.interceptors.request.use(async(request) => {
    return request;
}, error => {
    return  Promise.reject(error);
})

instance.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error)
})

export default instance;