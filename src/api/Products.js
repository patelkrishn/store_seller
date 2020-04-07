
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