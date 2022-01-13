<template>
    <div class="map-container">
      <l-map
          ref="map"
          :zoom="zoom"
          :center="center"
          @update:center="centerUpdated"
      >
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker :lat-lng="markerLatLng"></l-marker>
      </l-map>
    </div>
</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';
import L, { Icon } from 'leaflet';

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
    async addCoverageLayer(transmitter) {
      let map = this.$refs.map.mapObject;
      let coverageUrl = transmitter.coverage_file;
      let coverageBounds = [[transmitter.north_bound*0.99945, transmitter.east_bound],
        [transmitter.south_bound*0.99945, transmitter.west_bound]];
      let coverageOverlay = L.imageOverlay(coverageUrl, coverageBounds);

      let transmitterMarker = L.marker([transmitter.latitude, transmitter.longitude])

      let popup = L.popup()
        .setContent(`<b>${transmitter.station}</b>
                    <br>${transmitter.frequency} MHz`);
      transmitterMarker.bindPopup(popup).openPopup();

      let group = L.layerGroup([transmitterMarker, coverageOverlay]);
      group.addTo(map);

      this.center = [transmitter.latitude, transmitter.longitude];
    },
    centerUpdated(center) {
      this.center = center;
    },
  },
  mounted() {
    this.$root.$on('addCoverageLayer', (transmitter) => {
      this.addCoverageLayer(transmitter);
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