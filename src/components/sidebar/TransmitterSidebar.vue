<template>
  <div>
    <b-button v-b-toggle.transmitter-sidebar id="transmitters_button">Show transmitters</b-button>

    <b-sidebar id="transmitter-sidebar" title="Transmitters" width="440px" shadow right backdrop>
      <div class="p-3">
        <TransmitterCard/>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import TransmitterCard from "@/components/sidebar/TransmitterCard";
export default {
  name: "TransmitterSidebar",
  components: {TransmitterCard}
}

</script>

<style scoped>
#transmitters_button {
  margin: 5px;
}
</style>