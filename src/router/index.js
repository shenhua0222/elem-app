import Vue from 'vue'
import Router from 'vue-router'
import Star from '../components/rating/Rating'
import Goods from '../components/goods/Goods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/rating',
      component: Star
    },
    {
      path: '/*',
      redirect: '/goods'
    }
  ]
})
