import axios from 'axios';

const api = axios.create({
  baseURL: 'https://x1hnjxjj-3000.asse.devtunnels.ms/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
