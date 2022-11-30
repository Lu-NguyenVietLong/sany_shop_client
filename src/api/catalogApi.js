import axiosClient from "./axiosClient";

const catalogApi = {
  getAll: (params) => {
    const url = '/catalogs';
    return axiosClient.get(url, { params });
  },
}

export default catalogApi;