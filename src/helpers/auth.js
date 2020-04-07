
import { login , register,logout, me} from '../api/authenticate'

export function userLogin(credentials) {
    return new Promise((res, rej) =>{
        login(res,rej,credentials);
    })
    // console.log(credentials);
}

export function userRegistration(credentials) {
    return new Promise((res, rej) =>{
        register(res,rej,credentials);
    })
}

export function userLogout() {
    return new Promise((res, rej) =>{
        logout(res,rej);
    })
}

export function getRemoteUser() {
    return new Promise((res, rej) =>{
        me(res,rej);
    })
}

export function getLocalUser() {
    const userStr =localStorage.getItem("user");

    if (!userStr) {
        return null;
    }

    return JSON.parse(userStr);
}