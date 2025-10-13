import axios from 'axios';

export const attachBearer = (token?: string) => {
  const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
  return api;
};
