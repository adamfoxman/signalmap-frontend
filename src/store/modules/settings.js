const state = () => ({
    multipleTransmitters: false,
    autoZoom: true
});

const getters = {
    multipleTransmitters: state => state.multipleTransmitters,
    autoZoom: state => state.autoZoom
};

const actions = {
    setMultipleTransmitters({ commit }, value) {
        commit('setMultipleTransmitters', value);
    },
    setAutoZoom({ commit }, value) {
        commit('setAutoZoom', value);
    }
};

const mutations = {
    setMultipleTransmitters(state, value) {
        state.multipleTransmitters = value;
    },
    setAutoZoom(state, value) {
        state.autoZoom = value;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};