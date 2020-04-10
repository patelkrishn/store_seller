import {getLocalUser} from './helpers/auth';

const user = getLocalUser();

export default {
    state: {
        // apiUrl : 'http://localhost:5758/api/seller',
        apiUrl : 'https://myhisab.store/cdn/api/seller',
        currentUser: user,
        isLoggedIn: !! user,
        loading: false,
        auth_error: null,
        products: [],
        addProduct:[],
        success_message: '',
        error_message: '',
        snackbar: {
            value : false,
            color : null,
            data : null
        }
    },
    getters: {
        snackbar(state){
            return state.snackbar;
        },
        getApiUrl(state) {
            return state.apiUrl;
        },
        currentUser(state) {
            return state.currentUser;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        loading(state) {
            return state.loading;
        },
        authError(state) {
            return state.auth_error;
        },
        successMessage(state) {
            return state.success_message;
        },
        errorMessage(state) {
            return state.error_message;
        },
        products(state) {
            return state.products;
        },
        addProduct(state) {
            return state.addProduct;
        }
    },
    mutations: {
        login(state) {
            state.loading= true;
            state.auth_error =null;
        },
        loginSuccess(state, payload) {
            state.auth_error = null;
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({},payload.user, {token:payload.access_token});

            localStorage.setItem("user",JSON.stringify(state.currentUser));
        },
        loginFailed(state, payload) {
            state.loading = false;
            state.auth_error = payload;
        },
        loading(state,payload){
            state.loading = payload;
        },
        logout(state) {
            localStorage.removeItem("user");
            state.loading = false;
            state.isLoggedIn = false;
            state.currentUser = null;
            state.products = [];
        },
        successMessage(state,payload) {
            state.success_message = payload;
            state.snackbar={data:payload,color:'success',value:'true'};
        },
        errorMessage(state,payload) {
            state.error_message = payload;
            state.snackbar={data:payload,color:'red',value:'true'};
        },
        products(state,payload) {
            state.products = payload;
        },
        addProduct(state,payload) {
            state.addProduct = payload;
        },
        snackbar(state,payload){
            state.snackbar = payload;
        },
    },
    actions: {
        login(context) {
            context.commit("login");
        }
    }
};