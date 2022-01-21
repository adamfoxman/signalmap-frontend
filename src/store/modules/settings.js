const state = () => ({
    autoZoom: true
});

const getters = {
    autoZoom: state => state.autoZoom
};

const actions = {
    setAutoZoom({ commit }, value) {
        commit('setAutoZoom', value);
    }
};

const mutations = {
    toggleAutoZoom(state) {
        state.autoZoom = !state.autoZoom;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};