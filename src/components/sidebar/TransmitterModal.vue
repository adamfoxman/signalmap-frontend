<template>
  <div>
    <b-button
        id="more-info-button"
        variant="outline-primary"
        @click="showModal"
    >
      <span>More info</span>
    </b-button>

    <b-modal
        id="transmitter_info_modal"
        ref="transmitter_info_modal"
        centered
        :title="transmitter.station + ' at ' + transmitter.frequency + ' MHz'"
        size="lg"
    >
      <b-container fluid>
        <b-row>
          <b-col>
            <b-tabs content-class="mt-3">
              <b-tab title="Transmitter" active>
                <b-container fluid>
                  <b-row class="mb-3">
                    <b-col>
                      <b-table-simple hover small responsive>
                        <table class="table table-sm table-striped">
                          <tbody>
                          <tr>
                            <th>Station</th>
                            <td>{{ transmitter.station }}</td>
                          </tr>
                          <tr>
                            <th>Frequency</th>
                            <td>{{ transmitter.frequency }} MHz</td>
                          </tr>
                          <tr>
                            <th>Power</th>
                            <td>{{ transmitter.erp }} kW</td>
                          </tr>
                          <tr>
                            <th>Polarisation</th>
                            <td>{{polarisations.find(t => t.value === transmitter.polarisation).text}}</td>
                          </tr>
                          <tr>
                            <th rowspan="2">Antenna Height</th>
                            <td>{{ transmitter.antenna_height }} m AGL</td>
                          </tr>
                          <tr>
                            <td>{{ transmitter.height + transmitter.antenna_height }} ({{transmitter.height}}+{{transmitter.antenna_height}}) m ASL</td>
                          </tr>
                          </tbody>
                        </table>
                      </b-table-simple>
                    </b-col>
                  </b-row>
                </b-container>
              </b-tab>
              <b-tab title="Location">
                <b-container fluid>
                  <b-row class="mb-3">
                    <b-col>
                      <b-table-simple>
                        <table class="table table-sm table-striped">
                          <tbody>
                          <tr>
                            <th>Location</th>
                            <td>{{ transmitter.location }}</td>
                          </tr>
                          <tr>
                            <th>Height</th>
                            <td>{{ transmitter.height }} meters ASL</td>
                          </tr>
                          <tr>
                            <th>Latitude</th>
                            <td>{{ this.location.latitude }}</td>
                          </tr>
                          <tr>
                            <th>Longitude</th>
                            <td>{{ this.location.longitude }}</td>
                          </tr>
                          <tr>
                            <th>Region</th>
                            <td>{{ transmitter.region }}</td>
                          </tr>
                          <tr>
                            <th>Country</th>
                            <td>{{ this.country_name }}</td>
                          </tr>
                          </tbody>
                        </table>
                      </b-table-simple>
                    </b-col>
                  </b-row>
                </b-container>
              </b-tab>
            </b-tabs>
          </b-col>
          <b-col>
            <antenna-chart v-if="chartData.datasets !== []" :data="chartData" :options="options"/>
            <p v-else>No antenna pattern available.</p>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>


</template>

<script>
import AntennaChart from "@/components/sidebar/AntennaChart";

let parseAntennaPattern = (pattern) => {
  // split pattern string each 5 chars into array and convert strings to numbers
  return pattern.match(/.{1,5}/g).map(p => parseFloat(p));
}

let parseLocationCoords = (latitude, longitude) => {
  //convert latitude/longitude float to degrees/minutes/seconds
  let lat = parseFloat(latitude);
  let lon = parseFloat(longitude);
  let lat_deg = Math.floor(lat);
  let lat_min = Math.floor((lat - lat_deg) * 60);
  let lat_sec = Math.floor(((lat - lat_deg) * 60 - lat_min) * 60);
  let lon_deg = Math.floor(lon);
  let lon_min = Math.floor((lon - lon_deg) * 60);
  let lon_sec = Math.floor(((lon - lon_deg) * 60 - lon_min) * 60);
  return {
    latitude: lat_deg + "° " + lat_min + "' " + lat_sec + "''",
    longitude: lon_deg + "° " + lon_min + "' " + lon_sec + "''"
  }
}

export default {
  name: "TransmitterModal",
  components: {
    AntennaChart
  },
  props: {
    transmitter: {
      type: Object,
      required: true
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
      country_name: '',
      location: null,
      chartData: {
        labels: Array.from(Array(36).keys()).map(i => i * 10),
        datasets: []
      },
      options: {
        scale: {
          ticks: {
            beginAtZero: true,
          }
        }
      }
    }
  },
  async created() {
    const response = await fetch('http://localhost/api/v1/countries/code/?country_code=' + this.transmitter.country_id);
    const data = await response.json();
    this.country_name = data.country_name;

    this.location = parseLocationCoords(this.transmitter.latitude, this.transmitter.longitude)

    if (this.transmitter.pattern_v !== '') {
      this.chartData.datasets.push({
        label: 'Vertical [dbW]',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        data: parseAntennaPattern(this.transmitter.pattern_v)
      });
    }
    if (this.transmitter.pattern_h !== '') {
      this.chartData.datasets.push({
        label: 'Horizontal [dbW]',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        data: parseAntennaPattern(this.transmitter.pattern_h)
      });
    }
    // get max value of all datasets and set it in options
    this.options.scale.ticks.max = Math.max(...this.chartData.datasets.map(d => Math.max(...d.data)));

  },
  computed: {
    patternsAvailable() {
      return this.chartData.datasets.length > 0;
    }
  },
  methods: {
    showModal() {
      this.$refs.transmitter_info_modal.show();
    }
  }
}
</script>

<style scoped>
#more-info-button {
  margin-right: 10px;
}

</style>