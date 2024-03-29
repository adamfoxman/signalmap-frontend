<template>
  <div>
    <b-button v-b-modal.search_results_modal @click="fetchData">
      <i class="fas fa-search"></i>
      <span>Find in database</span>
    </b-button>

    <b-modal
        id="search_results_modal"
        centered
        title="Search Results"
        size="lg"
        v-if="this.country !== null && this.band !== null"
    >
      <b-table
          id="search_results_table"
          :items="searchResults"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
          :paginated="true"
          :busy="isBusy"
          small
          selectable
          :select-mode="selectMode"
          @row-selected="onRowSelected"
          empty-text="No results found. Try broadening your search."
          empty-filtered-text="No results found. Try broadening your search."
      >
        <template #cell(frequency)="data">
          {{data.value}} MHz
        </template>
        <template #cell(erp)="data">
          {{data.value}} kW
        </template>
        <template #cell(polarisation)="data">
          {{data.value.toUpperCase()}}
        </template>
        <template slot="table-busy">
          <b-spinner
              type="grow"
              variant="primary"
              label="Loading..."
          />
          <strong>Loading...</strong>
        </template>
        <template slot="table-empty">
          <b-empty-state
              icon="fas fa-search"
              title="No results found"
              description="Try a different search term"
          />
        </template>
        <template slot="table-footer">
          <b-pagination
              :total-rows="totalRows"
              :per-page="perPage"
              :current-page="currentPage"
              @change-page="changePage"
          />
        </template>
      </b-table>
      <b-pagination
          id="search_results_pagination"
          v-model="currentPage"
          :per-page="perPage"
          :total-rows="rows"
          aria-controls="search_results_table"
          centered>
      </b-pagination>
      <b-button-group>
        <b-button @click="addSelected"><span>Add selected</span></b-button>
        <b-button @click="addAll"><span>Add all</span></b-button>
      </b-button-group>
    </b-modal>
    <b-modal
      v-else
      id="search_results_modal"
      centered
      title="Error"
      size="lg">
      <b-alert show variant="danger">
        Please select a country and a band.
      </b-alert>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "SearchResults",
  props: {
    band: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    frequency: {
      type: Number,
      required: false
    },
    erp: {
      type: Number,
      required: false
    },
    polarisation: {
      type: String,
      required: false
    },
    station: {
      type: String,
      required: false
    },
    location: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      fields: [
        {
          key: "frequency",
          label: "Frequency",
          sortable: true
        },
        {
          key: "erp",
          label: "ERP",
          sortable: true
        },
        {
          key: "polarisation",
          label: "Polarisation",
          sortable: true
        },
        {
          key: "station",
          label: "Station",
          sortable: true
        },
        {
          key: "location",
          label: "Location",
          sortable: true
        }
      ],
      searchResults: [],
      selected: [],
      perPage: 10,
      currentPage: 1,
      isBusy: false,
      selectMode: 'multi',
    }
  },
  methods: {
    async fetchData() {
      this.isBusy = true;
      var apiAddress = 'http://localhost/api/v1/transmitters/query/?band=' + this.band + '&country=' + this.country
      if (this.frequency) {
        apiAddress += '&frequency=' + this.frequency
      }
      if (this.erp) {
        apiAddress += '&erp=' + this.erp
      }
      if (this.polarisation) {
        apiAddress += '&polarisation=' + this.polarisation
      }
      if (this.station) {
        apiAddress += '&station=' + this.station
      }
      if (this.location) {
        apiAddress += '&location=' + this.location
      }
      const response = await fetch(apiAddress)
      this.searchResults = await response.json();
      this.isBusy = false;
    },
    onRowSelected(items) {
      this.selected = items;
    },
    addSelected() {
      this.$store.commit('transmitters/addTransmitters', this.selected);
      this.$bvToast.toast('Transmitters added.', {
        title: 'Success',
        variant: 'success',
        solid: true,
        appendToast: true,
        autoHideDelay: 3000
      });
    },
    addAll() {
      this.$store.commit('transmitters/addTransmitters', this.searchResults);
      this.$bvToast.toast('All transmitters added.', {
        title: 'Success!',
        variant: 'success',
        solid: true,
        appendToast: true,
        autoHideDelay: 3000
      });
    }
  },
  computed: {
    rows() {
      return this.searchResults.length
    }
  }
}
</script>

<style scoped>
b-button {
  margin-bottom: 1rem;
}
</style>