const state = {
    INFO : null,
    EGGS_ROUTER : false
};
const getters = {
    
};
const actions = {
    INFO_FN_ACT : ({commit},msg) =>{
        commit("INFO_FN_MUT",msg)
    }
};
const mutations = {
    INFO_FN_MUT : (state,msg) => {
        state.INFO = msg;
    },
    EGGS_ROUTER_MUT : (state,msg) => {
        state.EGGS_ROUTER = msg;
    }
};
export default {
    state,
    getters,
    actions,
    mutations

}