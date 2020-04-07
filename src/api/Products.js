
import axios from 'axios'
import store from '../store'

//this is api url
const api_url= store.state.apiUrl;

export function getAllProducts() {
    return new Promise((res, rej) =>{
        axios.get(api_url+'/product?token='+store.state.currentUser.token)
            .then((response)=>{
                res(response.data);
            })
            .catch((err)=>{
                rej(err);
            })
    })
    
}

export function addProduct(credentials) {
    // console.log(credentials);
    return new Promise((res, rej) =>{
        axios.post(api_url+'/product?token='+store.state.currentUser.token, credentials)
            .then((response)=>{
                res(response);
            })
            .catch((err)=>{
                rej(err);
            })
    })
    
}

export function updateProduct(credentials) {
    // console.log(credentials);
    return new Promise((res, rej) =>{
        axios.put(api_url+'/product/'+credentials.id+'?token='+store.state.currentUser.token,credentials)
            .then((response)=>{
                res(response);
            })
            .catch((err)=>{
                rej(err);
            })
    })
    
}

export function deleteProduct(credentials) {
    // console.log(credentials);
    return new Promise((res, rej) =>{
        axios.delete(api_url+'/product/'+credentials+'?token='+store.state.currentUser.token)
            .then((response)=>{
                res(response);
            })
            .catch((err)=>{
                rej(err);
            })
    })
    
}