import Vue from 'vue';
import Vuex from "vuex";
import transmitters from "@/store/modules/transmitters";
import settings from "@/store/modules/settings";

Vue.use(Vuex);

const transmitterStore = new Vuex.Store({
    modules: {
        transmitters,
        settings
    }
});

export default transmitterStore;