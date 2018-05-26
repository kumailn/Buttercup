<template>
  <div id="app">
    <v-app dark>
    <Navy/>
    <router-view/>
    <center class="center">Made by Christine, Kumail, Neet and Sehaj</center>
    </v-app>
  </div>
</template>

<script>
import Navy from '@/components/Navy.vue'
export default {
  name: 'App',
  components: {
    Navy,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.center {
  color: white;
  font-size: 14pt;
  padding: 8px;
}
</style>
