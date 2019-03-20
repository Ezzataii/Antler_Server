<template>
  <div id="app">
    <router-view></router-view> 
  </div>
</template>

<script>
import Admin from "@/pages/Admin"


export default {
  name: 'app',
  components: {
    Admin
  }
}
</script>

<style>

</style>
