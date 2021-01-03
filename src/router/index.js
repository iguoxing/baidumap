import Vue from 'vue'
import Router from 'vue-router'
import Congestion from '../views/congestion/home.vue'
import CongestionIndex from '../views/congestionIndex/home.vue'
import HeatMap from '../views/heatmap/home.vue'
import Mapdata from '../views/mapdata/home.vue'
import NationCongestion from '../views/nationCongestion/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/index')
    },
    {
      path: '/congestion',
      name: 'Congestion',
      component: Congestion
    },
    {
      path: '/congestionIndex',
      name: 'CongestionIndex',
      component: CongestionIndex
    },
    {
      path: '/heatmap',
      name: 'HeatMap',
      component: HeatMap
    },
    {
      path: '/mapdata',
      name: 'Mapdata',
      component: Mapdata
    },
    {
      path: '/nationCongestion',
      name: 'NationCongestion',
      component: NationCongestion,
      meta: { keepAlive: true }
    }
  ]
})
