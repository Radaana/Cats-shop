import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import goods from './modules/goods'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    cart,
    goods
  }
})
