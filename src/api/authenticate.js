
import axios from 'axios'
import store from '../store'

export function login(res, rej,credentials) {
        axios.post(store.state.apiUrl+'/login', credentials)
            .then((response)=>{
                res(response.data);
            })
            .catch((err)=>{
                rej(err);
            })
}

export function register(res, rej,credentials) {
    axios.post(store.state.apiUrl+'/register', credentials)
            .then((response)=>{
                res(response.data);
            })
            .catch((err)=>{
                rej(err);
            })
}

export function logout(res, rej) {
    axios.post(store.state.apiUrl+'/logout?token='+store.state.currentUser.token)
            .then((response)=>{
                res(response.data);
            })
            .catch((err)=>{
                rej(err);
            })
}

export function me(res, rej) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+store.state.currentUser.token
      }
    axios.post(store.state.apiUrl+'/me?token='+store.state.currentUser.token,{
        headers : headers
    })
            .then((response)=>{
                res(response.data);
            })
            .catch((err)=>{
                rej(err);
            })
}