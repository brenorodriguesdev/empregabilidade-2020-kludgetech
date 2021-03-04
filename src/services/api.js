import axios from 'axios';

const api = axios.create({
    baseURL: 'https://apihcare.herokuapp.com/api'
})

export default api;