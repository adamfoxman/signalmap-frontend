<template>
  <b-card no-body>
    <b-col>
      <b-card-body :title="transmitter.station">
        <b-row>
          <b-col>{{transmitter.frequency}} MHz</b-col>
          <b-col>{{transmitter.erp}} kW</b-col>
          <b-col>{{polarisations.find(t => t.value === transmitter.polarisation).text}}</b-col>
        </b-row>
          <strong>Location: </strong>{{transmitter.location}}
      </b-card-body>

    </b-col>
    <b-row id="buttons" no no-gutters>
      <b-col>
        <b-button-group>
          <b-button
              ref="showButton"
              variant="outline-primary"
              @click="addCoverageLayer(); onShowButtonClick()"
          >
            <i class="fas fa-edit">Show</i>
          </b-button>
          <b-button
              ref="hideButton"
              variant="outline-primary"
              @click="deleteCoverageLayer(); onHideButtonClick()"
          >
            <i class="fas fa-edit">Hide</i>
          </b-button>
          <b-button
              variant="outline-danger"
              @click="deleteTransmitter"
          >
            <i class="fas fa-edit">Delete</i>
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: "TransmitterCard",
  props: {
    transmitter: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      polarisations: [
        {text: 'Not specified', value: null},
        {text: 'Horizontal', value: 'h'},
        {text: 'Vertical', value: 'v'},
        {text: 'Mixed', value: 'm'},
        {text: 'Slant', value: 's'},
        {text: 'Circular', value: 'c'}
      ],
      selected: []
    }
  },
  methods: {
    onShowButtonClick() {
      this.$refs.hideButton.disabled = false;
      this.$refs.showButton.disabled = true;
    },
    onHideButtonClick() {
      this.$refs.showButton.disabled = false;
      this.$refs.hideButton.disabled = true;
    },
    deleteTransmitter() {
      this.$store.commit('transmitters/removeTransmitter', this.transmitter);
      this.deleteCoverageLayer()
    },
    async fetchData() {
      const response = await fetch('http://localhost/api/v1/transmitters/get/external/?band=f&external_id=2400001');
      this.transmitter = await response.json();
    },
    // add coverage layer using kml data from the object on the map
    addCoverageLayer() {
      this.$store.commit('coverages/addCoverage', this.transmitter)
      this.$root.$emit('update-layers');
      this.$root.$emit('center-updated', [this.transmitter.latitude, this.transmitter.longitude]);
    },
    deleteCoverageLayer() {
      this.$store.commit('coverages/removeCoverage', this.transmitter)
      this.$root.$emit('update-layers');
    }
  },
  created() {
    this.$refs.hideButton.disabled = true;
  }
}
</script>

<style scoped>
b-card {
  max-width: 300px;
  margin: 5px;
}

#buttons {
  text-align: center;
  margin-bottom: 0.5rem;
}
</style>