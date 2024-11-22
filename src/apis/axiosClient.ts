import { localStorageDataNames } from '@/constants/appInfors';
import axios from 'axios';
import queryString from 'query-string';

const baseURL = `http://localhost:3001`;
const getAccessToken = () => {
  const res = localStorage.getItem(localStorageDataNames.authData);

  return res ? JSON.parse(res).token : '';
};

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  const accessToken = getAccessToken();
  config.headers = {
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
    Accpect: 'application/json',
    ...config.headers,
  };

  return { ...config, data: config.data ?? null };
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
