const state = () => ({
  coverages: [],
  multi: true,
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
            state.coverages.indexOf(coverage) === -1 ? state.coverages.push(coverage) : console.log("Coverage already exists");
        } else {
        state.coverages = [coverage]
        }
        console.log(state.coverages)
    },
    removeCoverage(state, coverage) {
        state.coverages = state.coverages.filter(c => c !== coverage)
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