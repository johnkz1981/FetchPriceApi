import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import ApiSummaryTable from './ApiSummaryTable'
import axios from './axios'
import error from './error'
import ModalInfoDetail from './ModalInfoDetail'
import loading from './loading'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    App,
    ApiSummaryTable,
    axios,
    error,
    ModalInfoDetail,
    loading
  }
})