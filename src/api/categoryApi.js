import axiosClient from './axiosClient';

const categoryApi = {
    getAll: (params) => {
        const url = '/categories';
        return axiosClient.get(url, { params });
    },
    get: (id) => {
        const url = `/category/${id}`;
        return axiosClient.get(url);
    },
};
export default categoryApi;
