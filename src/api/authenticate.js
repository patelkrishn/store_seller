
import axios from 'axios'
import store from '../store'

export function register(res, rej,credentials) {
    axios.post(store.state.apiUrl+'/register', credentials)
            .then((response)=>{
                res(response.data);
            })
            .catch((err)=>{
                rej(err);
            })
}


export function getLocalUser() {
    const userStr =localStorage.getItem("user");

    if (!userStr) {
        return null;
    }

    return JSON.parse(userStr);
}