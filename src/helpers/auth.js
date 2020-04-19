
import {  register} from '../api/authenticate'



export function userRegistration(credentials) {
    return new Promise((res, rej) =>{
        register(res,rej,credentials);
    })
}


export function getLocalUser() {
    const userStr =localStorage.getItem("user");

    if (!userStr) {
        return null;
    }

    return JSON.parse(userStr);
}