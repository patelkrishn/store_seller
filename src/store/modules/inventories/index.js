import axios from "axios";
import { router } from "../../../main";

const state = {
  inventories: [],
};

const getters = {
  getAllInventories(state){
    return state.inventories;
  }
};

const actions = {
  async fetchAllInventories(context){
    context.dispatch('setLoading',true);
    await axios
          .get(context.getters.getAuth.api_url+'/inventory',context.getters.getAuth.headers)
          .then((response)=>{
            context.commit('setAllInventories',response.data.inventories);
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
  async fetchSingleInventory(){},
  async insertInventory(context,payload){
    context.dispatch("setLoading",true);
    await axios
          .post(context.getters.getAuth.api_url+'/inventory',payload,context.getters.getAuth.headers)
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
  async updateInventory(){},
  async deleteInventory(){},
};

const mutations = {
  setAllInventories(state,payload){
    state.inventories=payload
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
