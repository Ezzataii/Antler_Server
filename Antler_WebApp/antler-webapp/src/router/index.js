import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/pages/Admin'
import Hello from '@/pages/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello
    }
  ]
})