import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import ApiSummaryTable from './ApiSummaryTable'
import ApiGeneralTable from './ApiGeneralTable'
import axios from './axios'
import error from './error'
import ModalInfoDetail from './ModalInfoDetail'
import loading from './loading'
import basket from './basket'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    App,
    ApiSummaryTable,
    ApiGeneralTable,
    axios,
    error,
    ModalInfoDetail,
    loading,
    basket
  }
})