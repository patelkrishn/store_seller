
import axios from 'axios'
import store from '../store'

//this is api url
const api_url= store.state.apiUrl;

export function getAllProducts() {
    return axios.get(api_url+'/product?token='+store.state.currentUser.token)
    .then((response)=>{
        // console.log(response);
        store.state.loading = false;
        store.state.products = response.data
    })
    .catch((err)=>{
        store.state.loading = false;
        store.state.error_message = err
    })
    
}

export function addProduct() {
    let credentials=store.state.addProduct;
    // console.log();
    return axios.post(api_url+'/product?token='+store.state.currentUser.token, credentials)
            .then((response)=>{
                store.state.success_message = response;
                store.state.loading = false;
            })
            .catch((err)=>{
                store.state.error_message = err
            })
    
    
}

export function updateProduct() {
    let credentials=store.state.addProduct;
    axios.put(api_url+'/product/'+credentials.id+'?token='+store.state.currentUser.token,credentials)
    .then((response)=>{
        store.state.success_message = response;
        store.state.loading = false;
    })
    .catch((err)=>{
        store.state.error_message = err
    })
    
}

export function deleteProduct(credentials) {
    store.state.loading = true;
    return new Promise((res, rej) =>{
        axios.delete(api_url+'/product/'+credentials+'?token='+store.state.currentUser.token)
            .then((response)=>{
                res(response);
                store.state.loading = false;
            })
            .catch((err)=>{
                rej(err);
                store.state.loading = false;
            })
    })
    
}