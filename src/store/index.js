import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.js'
import ApiSummaryTable from './ApiSummaryTable.js'
import BitrixTable from './BitrixTable.js'
import ApiDetailTable from './ApiDetailTable.js'
import axios from './axios.js'
import error from './error.js'
import ModalInfoDetail from './ModalInfoDetail.js'

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