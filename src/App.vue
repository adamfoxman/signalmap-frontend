<template>
  <div id="app">
    <NavigationBar id="navbar"/>
    <div id="map">
      <Map />
    </div>
    <div id="footer">
      <Footer/>
    </div>
  </div>
</template>

<script>
import NavigationBar  from "@/components/NavigationBar";
import Map from "@/components/Map";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    NavigationBar,
    Map,
    Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html, body, #app {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
}

#map {
  flex-grow: 1;
}

#footer {
  height: 10px;
}
</style>
