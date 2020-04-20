import axios from "axios";
import { router } from "../../../main";

const state = {
  products: [],
};

const getters = {
  getAllProducts(state){
    return state.products;
  }
};

const actions = {
  async fetchAllProducts(context){
    context.dispatch("setLoading", true);
    await axios
          .get(context.getters.getAuth.api_url+'/product',context.getters.getAuth.headers)
          .then((response)=>{
            context.commit("setAllProducts",response.data.products);
            context.dispatch("setLoading", false);
          })
          .catch((error)=>{
            if (error.response) {
              if (error.response.status == 401) {
                context.dispatch("setErrorMessage", error.response.statusText);
                localStorage.removeItem("user");
                context.dispatch("setCurrentUser", null);
                context.dispatch("setLoading", false);
                context.commit("userLogout");
                router.push({ path: "/login" });
              } else {
                context.dispatch("setErrorMessage",error.response.status + " " + error.response.statusText);
              }
            }
          })
    
  },
  async fetchSingleProduct(context){
    context.dispatch("setLoading", true);
    await axios
          .get()
          .then(()=>{
            context.dispatch("setLoading", false);
          })
          .catch((error)=>{
            if (error.response) {
              if (error.response.status == 401) {
                context.dispatch("setErrorMessage", error.response.statusText);
                localStorage.removeItem("user");
                context.dispatch("setCurrentUser", null);
                context.dispatch("setLoading", false);
                context.commit("userLogout");
                router.push({ path: "/login" });
              } else {
                context.dispatch("setErrorMessage",error.response.status + " " + error.response.statusText);
              }
            }
          })

  },
  async insertProduct(context,payload){
    context.dispatch("setLoading", true);
    await axios
          .post(context.getters.getAuth.api_url+'/product',payload,context.getters.getAuth.headers)
          .then((response)=>{
            context.dispatch("setLoading", false);
            context.dispatch("setSuccessMessage", response.data.message);
          })
          .catch((error)=>{
            if (error.response) {
              if (error.response.status == 401) {
                context.dispatch("setErrorMessage", error.response.statusText);
                localStorage.removeItem("user");
                context.dispatch("setCurrentUser", null);
                context.dispatch("setLoading", false);
                context.commit("userLogout");
                router.push({ path: "/login" });
              } else {
                context.dispatch("setErrorMessage",error.response.status + " " + error.response.statusText);
              }
            }
          })

  },
  async updateProduct(context,payload){
    context.dispatch("setLoading", true);
    await axios
          .put(context.getters.getAuth.api_url+'/product/'+payload.id,payload,context.getters.getAuth.headers)
          .then((response)=>{
            context.dispatch("setLoading", false);
            context.dispatch("setSuccessMessage", response.data.message);
          })
          .catch((error)=>{
            if (error.response) {
              if (error.response.status == 401) {
                context.dispatch("setErrorMessage", error.response.statusText);
                localStorage.removeItem("user");
                context.dispatch("setCurrentUser", null);
                context.dispatch("setLoading", false);
                context.commit("userLogout");
                router.push({ path: "/login" });
              } else {
                context.dispatch("setErrorMessage",error.response.status + " " + error.response.statusText);
              }
            }
          })
  },
  async deleteProduct(context,payload){
    context.dispatch("setLoading", true);
    await axios
          .delete(context.getters.getAuth.api_url+'/product/'+payload,context.getters.getAuth.headers)
          .then((response)=>{
            context.dispatch("setLoading", false);
            context.dispatch("setSuccessMessage", response.data.message);
          })
          .catch((error)=>{
            if (error.response) {
              if (error.response.status == 401) {
                context.dispatch("setErrorMessage", error.response.statusText);
                localStorage.removeItem("user");
                context.dispatch("setCurrentUser", null);
                context.dispatch("setLoading", false);
                context.commit("userLogout");
                router.push({ path: "/login" });
              } else {
                context.dispatch("setErrorMessage",error.response.status + " " + error.response.statusText);
              }
            }
          })
  }
};

const mutations = {
  setAllProducts(state,payload){
    state.products=payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
