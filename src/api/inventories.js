
import axios from 'axios'
import store from '../store'

//this is api url
const api_url= store.state.apiUrl;

export function getInventories(credentials) {
    return new Promise((res, rej) =>{
        axios.get(api_url+'/inventory/list/'+credentials+'?token='+store.state.currentUser.token)
            .then((response)=>{
                res(response.data);
            })
            .catch((err)=>{
                rej(err);
            })
    })
    
}

export function addInventories(credentials) {
    // console.log(credentials);
    return new Promise((res, rej) =>{
        axios.post(api_url+'/inventory?token='+store.state.currentUser.token, credentials)
            .then((response)=>{
                res(response);
            })
            .catch((err)=>{
                rej(err);
            })
    })
    
}

export function updateInventories(credentials) {
    // console.log(credentials);
    return new Promise((res, rej) =>{
        axios.put(api_url+'/inventory/'+credentials.id+'?token='+store.state.currentUser.token,credentials)
            .then((response)=>{
                res(response);
            })
            .catch((err)=>{
                rej(err);
            })
    })
    
}

export function deleteInventories(credentials) {
    // console.log(credentials);
    return new Promise((res, rej) =>{
        axios.delete(api_url+'/inventory/'+credentials+'?token='+store.state.currentUser.token)
            .then((response)=>{
                res(response);
            })
            .catch((err)=>{
                rej(err);
            })
    })
    
}