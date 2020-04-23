import axios from "axios";
import { router } from "../../../main";

const state = {
  allInvoices:[],
  singleInvoice:[]
};

const getters = {
  getAllInvoice(state){
    return state.allInvoices;
  },
  getSingleInvoice(state){
    return state.singleInvoice;
  }
};

const actions = {
  async fetchAllInvoices(context){
    context.dispatch("setLoading", true);
    await axios
          .get(context.getters.getAuth.api_url+'/invoices',context.getters.getAuth.headers)
          .then((response)=>{
            context.dispatch("setLoading", false);
            context.commit("setAllInvoices",response.data.invoices);
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
            context.dispatch("setLoading", false);
          })
  },
  async fetchSingleInvoice(context,payload){
    context.dispatch("setLoading", true);
    await axios
          .get(context.getters.getAuth.api_url+'/invoices/'+payload,context.getters.getAuth.headers)
          .then((response)=>{
            context.commit("setSingleInvoice",response.data.invoices);
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
            context.dispatch("setLoading", false);
          })
  },
  async insertInvoice(context,payload){
    context.dispatch("setLoading", true);
    await axios
          .post(context.getters.getAuth.api_url+'/invoices',payload,context.getters.getAuth.headers)
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
              console.log(error.response);
            }
            context.dispatch("setLoading", false);
          })
  },
  async updateInvoice(){},
  async deleteInvoice(){},
};

const mutations = {
  setAllInvoices(state,payload){
    state.allInvoices=payload;
  },
  setSingleInvoice(state,payload){
    state.singleInvoice=payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
