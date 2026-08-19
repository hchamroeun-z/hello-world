import axios from "axios";

const app_api_url= import.meta.env.VITE_APP_API_URL;

export async function apiSignup(user) {
    return await axios.post(app_api_url + '/signup',user);
}
export async function apiSignin(user) {
    return await axios.post(app_api_url+'/signin',user);
}
export async function apiSignOut(token) {
    return await axios.post(APP_API_URL + '/signout', null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function apiVerify(user) {
    return await axios.get(APP_API_URL + '/verify', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}