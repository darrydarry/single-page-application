import Vue from 'vue'
import VueRouter from 'vue-router'
import UsersList from '../pages/UsersList.vue'
import UserProfile from '../pages/UserProfile.vue'
import ErrorPage from '../pages/ErrorPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'user-list',
    component: UsersList
  },
  {
    path: '/user/:id',
    name: 'profile',
    component: UserProfile
  },
  {
    path: '/error',
    name: 'error-page',
    component: ErrorPage,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.name)
  if (to.name) {
    return next()
  }
    next('/error')
})

export default router
