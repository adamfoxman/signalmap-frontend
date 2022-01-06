<template>
    <div class="map-container">
      <l-map ref="map" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker :lat-lng="markerLatLng"></l-marker>
      </l-map>
    </div>
</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';
import { Icon } from 'leaflet';
import omnivore from '@mapbox/leaflet-omnivore';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [51.505, -0.159],
      markerLatLng: [51.504, -0.159]
    };
  },
  methods: {
    addCoverageLayer(kml) {
      let map = this.$refs.map.mapObject;

      fetch(kml)
          .then(response => response.text())
          .then(text => {
            const layer = omnivore.kml.parse(text);
            map.addLayer(layer);
            console.log(layer);
          }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted() {
    this.$root.$on('addCoverageLayer', (kml) => {
      this.addCoverageLayer(kml);
    });
  }
}
</script>

<style scoped>
.map-container {
  /*display: flex;*/
  height: 100%;
  width: auto;
}
</style>