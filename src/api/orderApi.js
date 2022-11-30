import axiosClient from './axiosClient';

const orderApi = {
    newOrder: ({fullName, phone, province, district, ward, address}) => {
        try {
            const url = '/order/new';
            return axiosClient.post(url, {fullName, phone, province, district, ward, address});
        } catch (error) {
            
        }
       
    },
};
export default orderApi;
