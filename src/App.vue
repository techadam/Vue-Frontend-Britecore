<template>
   <div>
      <Header></Header>
      <router-view></router-view>
   </div>
</template>

<script>
import Header from './components/layouts/Header.vue'

export default {
  name: 'app',
  components: {Header},
  created() {

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
  margin-top: 60px;
}
</style>
