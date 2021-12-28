<template>
  <div id="app">
    <NavigationBar id="navbar"/>
    <div id="map">
      <Map />
    </div>
  </div>
</template>

<script>
import NavigationBar  from "@/components/NavigationBar";
import Map from "@/components/Map";

export default {
  name: 'App',
  components: {
    NavigationBar,
    Map,
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
</style>
