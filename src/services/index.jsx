import axios from "axios";

const BASE_URL = "https://pruebareactjs.test-class.com/Api";

export const axiosWithoutBearer = axios.create({
    baseURL: BASE_URL,
});

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
    let tokenStore = JSON.parse(localStorage.getItem("persist:token"));
    config.headers["Authorization"] = `Bearer ${tokenStore.token}`;
    return config;
});

//===================================================================================================
//===========================================BODY====================================================
//===================================================================================================

export const useServiceAPI = () => {
    const axiosAPI = async (method, url, data = null) => {
        return await axiosInstance({
            method: method,
            url: url,
            data: data,
        });
    };

    const axiosWithoutBearerAPI = async (method, url, data = null) => {
        return await axiosWithoutBearer({
            method: method,
            url: url,
            data: data,
        });
    };

    return { axiosAPI, axiosWithoutBearerAPI };
};
