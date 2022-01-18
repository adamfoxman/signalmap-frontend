<template>
    <div class="map-container">
      <l-map
          ref="map"
          :zoom="zoom"
          :center="center"
          @update:center="centerUpdated"
      >
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      </l-map>
    </div>
</template>

<script>
import {LMap, LTileLayer} from 'vue2-leaflet';
import L, {Icon} from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

let createLayer = (transmitter) => {
  let coverageUrl = transmitter.coverage_file;
  let offset = 0.00006;
  let coverageBounds = [[transmitter.north_bound*(1.0-(Math.round(transmitter.north_bound)*0.00001)+offset), transmitter.east_bound],
    [transmitter.south_bound*(1.0-(transmitter.south_bound*0.00001)+offset), transmitter.west_bound]];
  let coverageOverlay = L.imageOverlay(coverageUrl, coverageBounds);

  let transmitterMarker = L.marker([transmitter.latitude, transmitter.longitude])

  let popup = L.popup()
      .setContent(`<b>${transmitter.station}</b>
                    <br>Frequency: ${transmitter.frequency} MHz
                    <br>Polarisation: ${transmitter.polarisation}
                    <br>Power: ${transmitter.erp} kW
                    <br>Antenna height: ${transmitter.height}+${transmitter.antenna_height} m
                    `);
  transmitterMarker.bindPopup(popup).openPopup();

  return L.layerGroup([transmitterMarker, coverageOverlay]);
}

export default {
  components: {
    LMap,
    LTileLayer,
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [51.505, -0.159],
      polarisations: [
        {text: 'Not specified', value: null},
        {text: 'Horizontal', value: 'h'},
        {text: 'Vertical', value: 'v'},
        {text: 'Mixed', value: 'm'},
        {text: 'Slant', value: 's'},
        {text: 'Circular', value: 'c'}
      ]
    };
  },
  methods: {
    async addCoverageLayer(transmitter) {
      let map = this.$refs.map.mapObject;
      let coverageUrl = transmitter.coverage_file;
      let offset = 0.00006;
      let coverageBounds = [[Math.round(transmitter.north_bound)*(1.0-(Math.round(transmitter.north_bound)*0.00001)+offset), transmitter.east_bound],
        [transmitter.south_bound*(1.0-(transmitter.south_bound*0.00001)+offset), transmitter.west_bound]];
      let coverageOverlay = L.imageOverlay(coverageUrl, coverageBounds);

      let transmitterMarker = L.marker([transmitter.latitude, transmitter.longitude])

      let popup = L.popup()
        .setContent(`<b>${transmitter.station}</b>
                    <br>Frequency: ${transmitter.frequency} MHz
                    <br>Polarisation: ${transmitter.polarisation}
                    <br>Power: ${transmitter.erp} kW
                    <br>Antenna height: ${transmitter.height}+${transmitter.antenna_height} m
                    `);
      transmitterMarker.bindPopup(popup).openPopup();

      let group = L.layerGroup([transmitterMarker, coverageOverlay]);
      group.addTo(map);

      this.center = [transmitter.latitude, transmitter.longitude];
    },
    centerUpdated(center) {
      this.center = center;
    },
    updateLayers() {
      let map = this.$refs.map.mapObject;
      map.eachLayer(layer => {
        if (!(layer instanceof L.TileLayer)) {
          map.removeLayer(layer);
        }
      });
      this.coverages.forEach(coverage => {
        // if not exists, add it
        createLayer(coverage).addTo(map);
      });
    }
  },
  mounted() {
    this.$root.$on('update-layers', this.updateLayers);
    this.$root.$on('center-updated', this.centerUpdated);
  },
  computed: {
    coverages() {
      return this.$store.state.coverages.coverages;
    },
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