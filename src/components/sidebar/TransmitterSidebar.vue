<template>
  <div>
    <b-button v-b-toggle.transmitter-sidebar id="transmitters_button">Show transmitters</b-button>

    <b-sidebar id="transmitter-sidebar" title="Transmitters" width="440px" shadow right backdrop>
      <div>
        <b-button-group size="sm">
          <b-button size="sm" @click="showAllTransmitters">Show all</b-button>
          <b-button size="sm" @click="hideAllTransmitters">Hide all</b-button>
          <b-button @click="deleteTransmitters" variant="danger" size="sm">Delete all</b-button>
        </b-button-group>
      </div>
      <div id="settings_group">
        <b-button-group size="sm">
          <b-button size="sm" @click="toggleAutoZoom">
            <i v-if="this.$store.getters['settings/autoZoom']">Auto zoom on</i>
            <i v-else>Auto zoom off</i>
          </b-button>
          <b-button size="sm" @click="toggleMulti">
            <i v-if="this.$store.getters['coverages/multi']">Multi mode</i>
            <i v-else>Single mode</i>
          </b-button>
        </b-button-group>
      </div>
      <div class="p-3" v-if="this.$store.getters['transmitters/getTransmittersListLength'] === 0">
        <p>No transmitters here.</p>
        <p/>
        <p>¯\_(ツ)_/¯</p>
      </div>
      <div class="p-3" v-for="transmitter in this.$store.state.transmitters.transmitters" :key="transmitter">
        <TransmitterCard :transmitter="transmitter" />
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import TransmitterCard from "@/components/sidebar/TransmitterCard";
export default {
  name: "TransmitterSidebar",
  components: {TransmitterCard},
  methods: {
    deleteTransmitters() {
      if (this.$store.getters["transmitters/getTransmittersListLength"] <= 0) {
        this.$bvToast.toast("No transmitters were deleted, since list is empty", {
          title: "Info",
          toaster: 'b-toaster-bottom-right',
          variant: "default",
          solid: true,
          autoHideDelay: 3000
        });
      }
      else {
        this.$store.commit("transmitters/removeAllTransmitters");
        this.$store.commit('coverages/removeAllCoverages');
        this.$root.$emit('update-layers');
        this.$bvToast.toast("All transmitters deleted", {
          title: "Deleted",
          toaster: 'b-toaster-bottom-right',
          variant: "success",
          solid: true,
          autoHideDelay: 3000
        });
      }
    },
    showAllTransmitters() {
      if (this.$store.getters["transmitters/getTransmittersListLength"] <= 0) {
        this.$bvToast.toast("No transmitters were shown, since list is empty", {
          title: "Info",
          toaster: 'b-toaster-bottom-right',
          variant: "default",
          solid: true,
          autoHideDelay: 3000
        });
      } else if (this.$store.getters["coverages/getCoveragesListLength"] === this.$store.getters["transmitters/getTransmittersListLength"]) {
        this.$bvToast.toast("All transmitters are displayed on a map.", {
          title: "Info",
          toaster: 'b-toaster-bottom-right',
          variant: "default",
          solid: true,
          autoHideDelay: 3000
        });
      } else {
        this.$store.commit("coverages/addCoverages", this.$store.state.transmitters.transmitters);
        this.$root.$emit('update-layers');
        this.$bvToast.toast("All transmitters shown on the map", {
          title: "Shown",
          toaster: 'b-toaster-bottom-right',
          variant: "success",
          solid: true,
          autoHideDelay: 3000
        });
      }
    },
    hideAllTransmitters() {
      if (this.$store.getters["transmitters/getTransmittersListLength"] <= 0) {
        this.$bvToast.toast("No transmitters were hidden, since list is empty", {
          title: "Info",
          toaster: 'b-toaster-bottom-right',
          variant: "default",
          solid: true,
          autoHideDelay: 3000
        });
      } else if (this.$store.getters["coverages/getCoveragesListLength"] === 0) {
        this.$bvToast.toast("All transmitters are hidden.", {
          title: "Info",
          toaster: 'b-toaster-bottom-right',
          variant: "default",
          solid: true,
          autoHideDelay: 3000
        });
      } else {
        this.$store.commit('coverages/removeCoverages');
        this.$root.$emit('update-layers');
        this.$bvToast.toast("All transmitters hidden from the map", {
          title: "Hidden",
          toaster: 'b-toaster-bottom-right',
          variant: "success",
          solid: true,
          autoHideDelay: 3000
        });
      }
    },
    toggleAutoZoom() {
      this.$store.commit('settings/toggleAutoZoom');
      this.$bvToast.toast("Auto zoom is now " + (this.$store.getters['settings/autoZoom'] ? "on" : "off"), {
        title: "Auto zoom",
        toaster: 'b-toaster-bottom-right',
        variant: "success",
        solid: true,
        autoHideDelay: 3000
      });
    },
    toggleMulti() {
      this.$store.commit('coverages/toggleMulti');
      if (!this.$store.state.coverages.multi) {
        this.$root.$emit('update-layers');
      }
      this.$bvToast.toast("Multi mode is now " + (this.$store.getters['coverages/multi'] ? "on" : "off"), {
        title: "Multi mode",
        toaster: 'b-toaster-bottom-right',
        variant: "success",
        solid: true,
        autoHideDelay: 3000
      });
    }
  }
}

</script>

<style scoped>
#transmitters_button {
  margin: 5px;
}

#settings_group {
  margin-top: 5px;
}
</style>