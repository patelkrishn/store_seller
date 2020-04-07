import {getLocalUser} from './helpers/auth';

const user = getLocalUser();

export default {
    state: {
        // apiUrl : 'http://localhost:5758/api/seller',
        apiUrl : 'http://cdn.lninfosystem.com/store/api/seller',
        currentUser: user,
        isLoggedIn: !! user,
        loading: false,
        auth_error: null,
        products: [],
        success_message: '',
        error_message: ''
    },
    getters: {
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
        logout(state) {
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.currentUser = null;
            state.products = [];
        },
        successMessage(state,payload) {
            state.success_message = payload;
        },
        errorMessage(state,payload) {
            state.error_message = payload;
        },
        products(state,payload) {
            state.products = payload;
        }
    },
    actions: {
        login(context) {
            context.commit("login");
        }
    }
};