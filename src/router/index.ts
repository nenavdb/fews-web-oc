import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import MapComponent from '../views/MapComponent.vue'
import Silent from '../views/auth/Silent.vue'
import Callback from '../views/auth/Callback.vue'
import Logout from '../views/auth/Logout.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/map',
    name: 'MapComponent',
    component: MapComponent
  }, {
    path: '/auth/silent',
    component: Silent
  }, {
    path: '/auth/callback',
    component: Callback
  }, {
    path: '/auth/logout',
    component: Logout
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
