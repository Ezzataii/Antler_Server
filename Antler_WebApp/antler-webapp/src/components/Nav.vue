<template>
<div id="navbar">
  <b-navbar toggleable="lg" type="dark" variant="info" fixed="true">

    <b-navbar-brand href="#">
      <img src="../assets/Logo.png" alt="Logo" width="50px">
      Antler
    </b-navbar-brand>

    <b-navbar-toggle target="nav_collapse" />
 
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="#" disabled>Home</b-nav-item>
        <b-nav-item href="#">About</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content"><em>User</em></template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>

  </b-navbar>
</div>
</template>

<script>
export default {
  name: 'Nav',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
