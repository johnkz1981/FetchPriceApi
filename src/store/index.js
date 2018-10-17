import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.js'
import ApiSummaryTable from './ApiSummaryTable.js'
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    App,
    ApiSummaryTable,
  }
})