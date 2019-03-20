import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/pages/Admin'

// Containers
const DefaultContainer = () => import('@/container/DefaultContainer')

// Views
const Routing = () => import('@/views/Routing')



Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: "Routing",
          name: "Routing",
          component: Routing
            
        }
      ]
    }
  ]
})
