import axios from 'axios';
import queryString from 'query-string';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

const baseURL = process.env.REACT_APP_BASE_URL;

let authTokens = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        // 'content-type': 'application/json',
        token: `Bearer ${authTokens?.accessToken}`,
    },
    // paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    if (!authTokens) {
        let authTokens = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
        config.headers.token = `Bearer ${authTokens?.accessToken}`;
    }else {
        const user = jwt_decode(authTokens.accessToken);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        if (!isExpired) return config;
        const response = await axios.post(`${baseURL}/auth/refresh`, {
            refresh: authTokens.refreshToken,
        });
        localStorage.setItem('token', JSON.stringify(response.data));
        config.headers.token = `Bearer ${response.data.accessToken}`;
    }
    return config;
});
axiosClient.interceptors.response.use( (response) => {
        if (response && response.data) return response.data;
        return response;
    },
    (error) => {
        throw error;
    },
);
export default axiosClient;
