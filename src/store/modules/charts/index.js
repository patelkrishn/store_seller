import axios from "axios";
import { router } from "../../../main";

const state = {
    mainChart:{
      todaySales:[],
      thisMonthSales:[],
      thisYearSales:[],
      yesterdaySales:[],
      lastMonthSales:[],
      lastYearSales:[],
      expenseTodaySoFar:[],
      earningTodaySoFar:[],
      highestSale:{
        invoiceQuantity:[],
        productName:[],
      },
      thisMonthSalesGraph:{
        totalAmount:[],
        date:[],
      },
    },
};

const getters = {
  getMainChart(state){
    return state.mainChart;
  },
};

const actions = {
  async fetchMainChart(context){
    context.dispatch("setLoading", true);
    await axios
          .get(context.getters.getAuth.api_url+'/charts',context.getters.getAuth.headers)
          .then((response)=>{
            context.dispatch("setLoading", false);
            context.commit("setMainChart",response.data);
          })
          .catch((error)=>{
            if (error.response) {
              if (error.response.status == 401) {
                context.dispatch("setErrorMessage", error.response.statusText);
                localStorage.removeItem("user");
                context.dispatch("setCurrentUser", null);
                context.commit("userLogout");
                router.push({ path: "/login" });
              } else {
                context.dispatch("setErrorMessage",error.response.status + " " + error.response.statusText);
              }
            }
            context.dispatch("setLoading", false);
          })
  },
};

const mutations = {
  setMainChart(state,payload){
    state.mainChart=payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
