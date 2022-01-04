<template>
  <div>
    <b-button v-b-modal.search_modal variant="primary" id="search_button">
      <i class="fa fa-search"></i>
      <span>Search</span>
    </b-button>

    <b-modal
        id="search_modal"
        centered
        title="Search transmitters"
        :scrollable="true"
        size="lg">
      <b-container fluid>
        <b-row class="mb-1 text-center">
          <b-col cols="3">
            <b-form-group label="Band" label-for="band">
              <b-form-select v-model="selected_band" :options="bands"></b-form-select>
            </b-form-group>
            <div class="mt-3">Selected band: <strong>{{selected_band}}</strong></div>
          </b-col>
          <b-col cols="3">
            <b-form-group label="Polarisation" label-for="polarisation">
              <b-form-select v-model="selected_polarisation" :options="polarisations"></b-form-select>
            </b-form-group>
            <div class="mt-3">Selected polarisation: <strong>{{selected_polarisation}}</strong></div>
          </b-col>
          <b-col cols="3">
            <b-form-group label="Frequency" label-for="frequency">
              <b-form-input v-model="selected_freq" type="number"></b-form-input>
            </b-form-group>
            <div class="mt-3">Selected frequency: <strong>{{selected_freq}}</strong></div>
          </b-col>
          <b-col cols="3">
            <b-form-group label="ERP power" label-for="erp">
              <b-form-input v-model="selected_erp" type="number" min="0"></b-form-input>
            </b-form-group>
            <div class="mt-3">ERP power: <strong>{{selected_erp}}</strong></div>
          </b-col>
        </b-row>
        <b-row class="mb-1 text-center">
          <b-col cols="3">
            <b-form-group label="Country" label-for="country">
              <b-form-select v-model="selected_country" :options="countries"></b-form-select>
            </b-form-group>
            <div class="mt-3">Selected country: <strong>{{selected_country}}</strong></div>
          </b-col>
          <b-col cols="5">
            <b-form-group label="Location" label-for="location">
              <b-form-input v-model="selected_location" type="search"></b-form-input>
            </b-form-group>
            <div class="mt-3">Location: <strong>{{selected_location}}</strong></div>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Station" label-for="station">
              <b-form-input v-model="selected_station" type="search"></b-form-input>
            </b-form-group>
            <div class="mt-3">Station: <strong>{{selected_station}}</strong></div>
          </b-col>
        </b-row>
        <SearchResults
            :band="selected_band"
            :country="selected_country"
            :frequency="selected_freq"
            :erp="selected_erp"
            :polarisation="selected_polarisation"
            :location="selected_location"
            :station="selected_station"
        />
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import SearchResults from '@/components/search/SearchResults.vue';

export default {
  name: "SearchButton",
  components: {
    SearchResults,
  },
  data() {
    return {
      selected_band: null,
      selected_country: null,
      selected_freq: null,
      selected_erp: null,
      selected_polarisation: null,
      selected_station: null,
      selected_location: null,
      bands: [{text: 'FM Radio', value: 'f'}, {text: 'DAB/DAB+ Radio', value: 'd'}, {text: 'TV', value: 't'}],
      countries: [],
      dab_frequencies: [
        {text: 'Not specified', value: null},
        {text: '5A', value: 174.928},
        {text: '5B', value: 176.640},
        {text: '5C', value: 178.352},
        {text: '5D', value: 180.064},
        {text: '6A', value: 181.936},
        {text: '6B', value: 183.648},
        {text: '6C', value: 185.360},
        {text: '6D', value: 187.072},
        {text: '7A', value: 188.928},
        {text: '7B', value: 190.640},
        {text: '7C', value: 192.352},
        {text: '7D', value: 194.064},
        {text: '8A', value: 195.936},
        {text: '8B', value: 197.648},
        {text: '8C', value: 199.360},
        {text: '8D', value: 201.072},
        {text: '9A', value: 202.928},
        {text: '9B', value: 204.640},
        {text: '9C', value: 206.352},
        {text: '9D', value: 208.064},
        {text: '10A', value: 209.936},
        {text: '10B', value: 211.648},
        {text: '10C', value: 213.360},
        {text: '10D', value: 215.072},
        {text: '11A', value: 216.928},
        {text: '11B', value: 218.640},
        {text: '11C', value: 220.352},
        {text: '11D', value: 222.064},
        {text: '12A', value: 223.936},
        {text: '12B', value: 225.648},
        {text: '12C', value: 227.360},
        {text: '12D', value: 229.072}
      ],
      polarisations: [
        {text: 'Not specified', value: null},
        {text: 'Horizontal', value: 'h'},
        {text: 'Vertical', value: 'v'},
        {text: 'Mixed', value: 'm'},
        {text: 'Slant', value: 's'},
        {text: 'Circular', value: 'c'}
      ],
      search_text: ""
    }
  },
  created() {
    const fetchCountries = async () => {
      const response = await fetch('http://localhost/api/v1/countries/');
      const json = await response.json();
      return json.map(country => ({text: country.country_name, value: country.country_code}));
    };

    fetchCountries().then(countries => {
      this.countries = countries;
    });
  }
}
</script>

<style scoped>
#search_button {
  margin: 5px;
}
</style>