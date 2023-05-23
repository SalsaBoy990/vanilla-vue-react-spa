import axios from "axios";
import Cookies from 'js-cookie';
import {state} from "./state";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Get the token for an authorized request
    const token = Cookies.get(state.token);

    // set headers for all authenticated requests
    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }

    config.headers.put['Content-Type'] = 'application/json';

    return config;
});

export default axios;
