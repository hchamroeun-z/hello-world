import axios from "axios";

const app_api_url= import.meta.env.VITE_APP_API_URL;

export async function apiSignup(user) {
    return await axios.post(app_api_url + '/signup',user);
}
export async function apiSignin(user) {
    return await axios.post(app_api_url+'/signin',user);
}
export async function apiSignOut(token) {
    return await axios.post(app_api_url + '/signout', null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function apiVerify() {
    return await axios.get(app_api_url + '/verify');
}

export async function apiChangePassword(current_password, new_password, new_password_confirmation) {
    return await axios.put(app_api_url + '/change/password', { current_password, new_password, new_password_confirmation });
}