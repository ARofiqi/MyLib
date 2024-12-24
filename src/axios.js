import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.180.210:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
