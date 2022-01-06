<template>
  <div>
    <b-button v-b-toggle.transmitter-sidebar id="transmitters_button" @click="openSidebar">Show transmitters</b-button>

    <b-sidebar id="transmitter-sidebar" title="Transmitters" width="440px" shadow right backdrop>
      <div class="p-3" v-for="transmitter in this.transmitters" :key="transmitter">
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
  data() {
    return {
      transmitters: [],
    };
  },
  methods: {
    openSidebar() {
      // this.transmitters = this.$store.state["transmitters/transmittersList"];
      this.transmitters = this.$store.state.transmitters.transmitters;
      // console.log(this.$store.getters.getTransmittersList);
      console.log(this.transmitters);
    }
  }
}

</script>

<style scoped>
#transmitters_button {
  margin: 5px;
}
</style>