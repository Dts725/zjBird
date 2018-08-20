const state = {
    AO_WHITE_BAR_DATA : "工友白条"
};
const getters = {
//留着备用
};
const actions = {
//留着备用
AO_WHITE_BAR_DATA_ACT :({commit},msg) => {
    commit('AO_WHITE_BAR_DATA_MUT',msg);
    }
}
const mutations = {
    AO_WHITE_BAR_DATA_MUT : (state,msg) => {
        state.AO_WHITE_BAR_DATA = msg;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}