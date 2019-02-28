<template>
  <div>
    <Nav/>

    <div>

    </div>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'

export default {
  name: 'app',
  components: {
    Nav
  }
}
</script>

<style>
html body {
  background-color: #333333;
  color: #dddddd;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
