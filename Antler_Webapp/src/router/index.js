import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/pages/Admin'

// Containers
const DefaultContainer = () => import('@/container/DefaultContainer')

// Views
const Home = () => import('@/views/Home');
const Routing = () => import('@/views/Routing');
const Devices = () => import('@/views/Devices')
const SetupDevice = () => import("@/views/SetupDevice");
const Ads = () => import('@/views/Ads');
const GMap = () => import('@/views/Map');


Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      name: "Home",
      component: DefaultContainer,
      children: [
        {
          path: "",
          name: "",
          component: Home
        }, {
          path: "Routing",
          name: "Routing",
          component: Routing
        }, {
          path: "Devices",
          name: "Devices",
          component: Devices
        }, {
          path: "SetupDevice",
          name: "Setup Device",
          component: SetupDevice
        }, {   
          path: "Ads",
          name: "Ads",
          component: Ads
        }, {
          path: "Map",
          name: "Map",
          component: GMap
        }, {
          path: "About",
          name: "About Us",
          component: Home
        }
      ]
    }
  ]
})
