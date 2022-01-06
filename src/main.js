import Vue from 'vue'
import Vuex from 'vuex'
import App from './components/App.vue'
import transmitterStore from './store/index'
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

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: transmitterStore
}).$mount('#app');
