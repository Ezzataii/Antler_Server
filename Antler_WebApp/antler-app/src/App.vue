<template>
  <router-view></router-view>
</template>

<script>
//<Nav class="sticky-top" nav="nav"/>
import Nav from '@/components/Nav';

export default {
  name: 'App',
  components: {
    Nav
  }
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0px;
  padding: 0px;
}

</style>

<style lang="scss">
  // CoreUI Icons Set
  // @import '~@coreui/icons/css/coreui-icons.min.css';
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome.scss';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
  /* Import Flag Icons Set */
  //@import '~flag-icon-css/css/flag-icon.min.css';
  /* Import Bootstrap Vue Styles */
  //@import '~bootstrap-vue/dist/bootstrap-vue.css';
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
