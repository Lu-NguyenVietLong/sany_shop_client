import axios from "axios";
import { toast } from "react-toastify";
import axiosClient from "./axiosClient";

const authApi = {
    login: async ({username, password}) => {
        try {
            console.log({username, password});
            const url = 'auth/login'
           return await axiosClient.post(url, {username, password})
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message)
        }
    },
    register: async ({username, password, email}) => {
        try {
            console.log({username, password});
            const url = 'auth/register'
           return await axiosClient.post(url, {username, password, email})
        } catch (err) {
            
            console.log(err);
        }
    },
}

export const signupUser = async (user, dispatch, navigate) => {
    // dispatch(signupStart())
    try {
        const res = await axiosClient.post('auth/register', user)
        // dispatch(signupSuccess())
        // navigate("/SignUp")
    } catch (err) {
        // dispatch(signupFailed())
    }
}

export const logoutUsers = async (dispatch, id, navigate) => {
    // dispatch(logoutStart())
    try {
        await axiosClient.post("auth/logout", id)
        // document.cookie = "refreshToken=;expires=Thu, 01 Jan 2022 00:00:00 GMT";
        // dispatch(logoutSuccess())
        // navigate("/SignUp")
    } catch {
        // dispatch(logoutFailed())
    }
}
export default authApi;