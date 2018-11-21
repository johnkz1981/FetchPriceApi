import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import ApiSummaryTable from './ApiSummaryTable'
import BitrixTable from './BitrixTable'
import ApiDetailTable from './ApiDetailTable'
import axios from './axios'
import error from './error'
import ModalInfoDetail from './ModalInfoDetail'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    App,
    ApiSummaryTable,
    BitrixTable,
    ApiDetailTable,
    axios,
    error,
    ModalInfoDetail
  }
})