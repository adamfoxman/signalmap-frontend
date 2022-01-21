const state = () => ({
  coverages: [],
  multi: true,
})

const getters = {
    coverages: state => state.coverages,
    multi: state => state.multi,
    getCoveragesListLength: state => state.coverages.length,
}

const actions = {

}

const mutations = {
    // add coverage to list if multi is true or change it if multi is false
    addCoverage(state, coverage) {
        try {
            if (state.multi) {
                state.coverages.indexOf(coverage) === -1 ? state.coverages.push(coverage) : console.log("Coverage already exists");
            } else {
                state.coverages = [coverage]
            }
        } catch (error) {
            console.error(error);
        }
    },
    addCoverages(state, coverages) {
        try {
            if (state.multi) {
                state.coverages = coverages;
            } else {
                state.coverages = [coverages[0]]
            }
        } catch (error) {
            console.error(error);
        }
    },
    removeCoverage(state, coverage) {
        try {
            state.coverages = state.coverages.filter(c => c !== coverage)
        } catch (error) {
            console.error(error);
        }
    },
    removeCoverages(state) {
        try {
            state.coverages = []
        } catch (error) {
            console.error(error);
        }
    },
    // set multi state, if false - leave only one coverage in list
    toggleMulti(state) {
        try {
            state.multi = !state.multi
            if (!state.multi) {
                state.coverages = state.coverages.slice(-1)
            }
        } catch (error) {
            console.error(error);
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