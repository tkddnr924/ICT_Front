import Vue from 'vue'
import Vuex from 'vuex'

import { getCurrentParkStatus } from '@/common/api/park'
import { getMarketStatisticDay } from '@/common/api/market'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    drawer: null,
    parkStatus: [],
    statisticDay: [],
  },
  mutations: {
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_SCRIM (state, payload) {
      state.barColor = payload
    },
    SET_PARK_STATUS (state, payload) {
      state.parkStatus = payload
    },
    SET_STATISTIC_DAY (state, payload) {
      state.statisticDay = payload
    },
  },
  actions: {
    getParkStatus ({ commit }) {
      return new Promise(resolve => {
        getCurrentParkStatus().then(response => {
          if (response.data.status) {
            commit('SET_PARK_STATUS', response.data.data)
            resolve()
          } else {
            alert('실패...')
          }
        })
      })
    },
    getStatisticDay ({ commit }) {
      return new Promise(resolve => {
        getMarketStatisticDay().then(response => {
          if (response.data.status) {
            commit('SET_STATISTIC_DAY', response.data.data)
            resolve()
          } else {
            alert('실패...')
          }
        })
      })
    },
  },
  getters: {
    emptyPark: state => {
      if (!state.parkStatus.length) return { count: '0', status: 'EMPTY' }

      const result = state.parkStatus.filter(item => {
        return item.status === 'EMPTY'
      })

      if (!result.length) return { count: '0', status: 'EMPTY' }

      return result[0]
    },
    parkPark: state => {
      if (!state.parkStatus.length) return { count: '0', status: 'PARK' }

      const result = state.parkStatus.filter(item => {
        return item.status === 'PARK'
      })

      if (!result.length) return { count: '0', status: 'PARK' }

      return result[0]
    },
    reservePark: state => {
      if (!state.parkStatus.length) return { count: '0', status: 'RESERVE' }

      const result = state.parkStatus.filter(item => {
        return item.status === 'RESERVE'
      })

      if (!result.length) return { count: '0', status: 'RESERVE' }

      return result[0]
    },
    lineChart: state => {
      if (!state.statisticDay.length) return undefined

      return {
        chartOptions: {
          chart: {
            id: 'vuechart-example',
          },
          xaxis: {
            categories: state.statisticDay.map(item => {
              return item.hour + '시'
            }),
          },
        },
        series: [{
          name: '통계',
          data: state.statisticDay.map(item => {
            return item.count
          }),
        }],
      }
    },
  },
})
