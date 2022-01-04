<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">

      <b-navbar-brand href="#" tag="h1" id="logo">
        <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-transmitter-information-technology-flatart-icons-outline-flatarticons.png" width="30" height="30" alt="">
        SignalMap
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <SearchButton />
          <TransmitterSidebar />
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>
  </div>
</template>

<script>
import SearchButton from "@/components/search/SearchButton";
import TransmitterSidebar from "@/components/sidebar/TransmitterSidebar";

export default {
  name: "NavigationBar",
  components: {SearchButton, TransmitterSidebar}
}
</script>

<style scoped>

</style>