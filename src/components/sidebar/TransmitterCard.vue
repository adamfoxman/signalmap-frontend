<template>
  <b-card no-body>
    <b-col>
      <b-card-body :title="transmitter.station">
        <b-row>
          <b-col><p>{{transmitter.frequency}} MHz</p></b-col>
          <b-col><p>{{transmitter.erp}} kW</p></b-col>
          <b-col><p>{{polarisations.find(t => t.value === transmitter.polarisation).text}}</p></b-col>
        </b-row>
          <p class="text-center"><strong>Location: </strong>{{transmitter.location}}</p>
      </b-card-body>

    </b-col>
    <b-row id="buttons" no no-gutters>
      <b-col>
        <b-button-group>
          <b-button
              variant="outline-primary"
              @click="$emit('delete')"
          >
            <i class="fas fa-edit">Show</i>
          </b-button>
          <b-button
              variant="outline-danger"
              @click="$emit('delete')"
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
      ]
    }
  },
  methods: {
    deleteTransmitter() {
      this.$emit("delete");
    },
    async fetchData() {
      const response = await fetch('http://localhost/api/v1/transmitters/get/external/?band=f&external_id=2400001');
      this.transmitter = await response.json();
      console.log(this.transmitter);
    }
  },
  created() {
    this.fetchData();
  }
}
</script>

<style scoped>
b-card {
  max-width: 300px;
}
#buttons {
  text-align: center;
}
</style>