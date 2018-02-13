import axios from 'axios';

axios.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response.data;
}, error => {})

export default axios;