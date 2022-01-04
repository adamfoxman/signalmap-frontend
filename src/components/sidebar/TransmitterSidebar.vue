<template>
  <div>
    <b-button v-b-toggle.transmitter-sidebar id="transmitters_button">Show transmitters</b-button>

    <b-sidebar id="transmitter-sidebar" title="Transmitters" shadow right backdrop>
      <div class="p-3">
        amogus
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "TransmitterSidebar"
}

</script>

<style scoped>
#transmitters_button {
  margin: 5px;
}
</style>