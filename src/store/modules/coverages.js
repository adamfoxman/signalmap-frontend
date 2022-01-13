const state = () => ({
  coverages: [],
  multi: false,
})

const getters = {
  coverages: state => state.coverages,
  multi: state => state.multi,
}

const actions = {

}

const mutations = {
    // add coverage to list if multi is true or change it if multi is false
    addCoverage(state, coverage) {
        if (state.multi) {
        state.coverages.push(coverage)
        } else {
        state.coverages = [coverage]
        }
    },
    removeCoverage(state, coverage) {
        state.coverages = state.coverages.filter(c => c.id !== coverage.id)
    },
    // set multi state, if false - clear coverages list
    setMulti(state, multi) {
        state.multi = multi
        if (!multi) {
            state.coverages = [state.coverages.at(state.coverages.length - 1)]
        }
    },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}