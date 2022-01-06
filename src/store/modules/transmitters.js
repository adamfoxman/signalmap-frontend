const state = () => ({
    transmitters: [],
});

const getters = {
    getTransmittersList: state => state.transmitters,
};

const actions = {

}

const mutations = {
    addTransmitter(state, transmitter) {
        state.transmitters.push(transmitter);
    },
    addTransmitters(state, transmitterList) {
        //  add transmitters from a list to the store and delete doubled ones
        transmitterList.forEach(transmitter => {
            let found = false;
            state.transmitters.forEach(t => {
                if (t.external_id === transmitter.external_id && t.band === transmitter.band) {
                    found = true;
                }
            });
            if (!found) {
                state.transmitters.push(transmitter);
            }
        });
        console.log(transmitterList);
        console.log(state.transmitters);
    },
    removeTransmitter(state, transmitter) {
        state.transmitters.splice(state.transmitters.indexOf(transmitter), 1);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}