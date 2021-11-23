import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Settings from '../views/Settings.vue'
import Discussion from '../views/Discussion.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/discussion/:id',
    name: 'Discussion',
    component: Discussion
  }
]

const router = new VueRouter({
  routes
})

export default router
