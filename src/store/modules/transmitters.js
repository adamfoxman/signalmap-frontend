const state = () => ({
    transmitters: [],
});

const getters = {
    getTransmittersList: state => state.transmitters,
    getTransmittersListLength: state => state.transmitters.length,
};

const actions = {

}

const mutations = {
    addTransmitter(state, transmitter) {
        state.transmitters.push(transmitter);
    },
    addTransmitters(state, transmitterList) {
        //  add transmitters from a list to the store and delete doubled ones
        try {
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
        } catch (e) {
            console.error(e);
        }
    },
    removeTransmitter(state, transmitter) {
        try {
            state.transmitters.splice(state.transmitters.indexOf(transmitter), 1);
        } catch (e) {
            console.error(e);
        }
    },
    removeAllTransmitters(state) {
        try {
            state.transmitters = [];
        } catch (e) {
            console.error(e);
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