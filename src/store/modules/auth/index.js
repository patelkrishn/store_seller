const state = {
  mode: "dev",
  dev_api_url: "http://localhost:5758/api/seller",
  prod_api_url: "https://api.asatine.store/api/seller",
  token: null,
};

const getters = {
  getAuth(state) {
    let api_url;
    if (state.mode == "dev") {
      api_url = state.dev_api_url;
    } else if (state.mode == "prod") {
      api_url = state.prod_api_url;
    }
    return {
      api_url: api_url,
      token: state.token,
    };
  },
};

const actions = {
    setToken(context){
        context.commit("setToken");
    }
};

const mutations = {
    setToken(state,payload){
        state.token=payload;
    }
};

export default {
  namespace:true,
  state,
  getters,
  actions,
  mutations,
};
