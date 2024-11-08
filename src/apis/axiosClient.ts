import axios from 'axios';
import queryString from 'query-string';

const baseURL = `http://localhost:3001`;
const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config: any) => {
  config.headers = {
    Authorization: '',
    Accpect: 'application/json',
    ...config.headers,
  };
  config.data;
  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    if (res.data && res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      return Promise.reject(res.data);
    }
  },
  (err) => {
    const { response } = err;
    return Promise.reject(response.data);
  }
);
export default axiosClient;
