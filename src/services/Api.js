import axios from 'axios'

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data', //application/x-www-form-urlencoded      multipart/form-data       application/json
    Accept: '*/*',
  },
})

api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('Connection error', error)
  
    return Promise.reject(error)
  },
)

export default api