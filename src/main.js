import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

const transmitterStore = new Vuex.Store({
  state: {
    transmitters: []
  },
  mutations: {
    addTransmitter(state, transmitter) {
      state.transmitters.push(transmitter);
    },
    removeTransmitter(state, transmitter) {
      state.transmitters.splice(state.transmitters.indexOf(transmitter), 1);
    }
  }
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: transmitterStore
}).$mount('#app');
