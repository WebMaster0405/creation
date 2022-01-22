<template>
  <div id="app">
    <SideBar/>
    <div style="margin-left:256px;">
      <UpComing />
    </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue'
import UpComing from './views/UpComing.vue'
export default {
  name: 'App',
  components: {
    SideBar,
    UpComing
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
  margin-top: 60px;
}
</style>
