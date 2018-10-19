import axios from "axios";

export default {
  state: {
    manufacturer: '',
    count: 0,
    data: {},
    searchCode: ''
  },
  mutations: {
    setManufacturer(state, payload) {
      state.manufacturer = payload.manufacturer
    },
    setData(state, payload) {
      state.data = payload;
    },
    setSearchCode(state, payload) {
      state.searchCode = payload;
    },
  },
  actions: {
    async getData({dispatch, commit}, payload) {
      const data = {bitrix: [], api: []};
      commit('setData', data);
      commit('setSearchCode', payload.searchCode);
      commit('setBitrixLoading', true);
      payload.bitrix = 'yes';
      payload.group = 'no';

      await dispatch('setParam', payload).then(result => {
            data.bitrix = result.data;
            commit('setData', data);
            commit('setBitrixLoading', false);
            commit('setApiSummaryLoading', true);
          }
      ).catch(error => console.log(error));

      payload.bitrix = 'no';
      payload.group = 'yes';

      await dispatch('setParam', payload).then(result => {
            data.api = result.data;
            commit('setData', data);
            commit('setApiSummaryLoading', false);
          }
      ).catch(error => console.log(error));
    },

    setParam({state}, payload) {
      return axios({
            method: "get",
            url: payload.url,
            params: {
              q: state.searchCode,
              bitrix: payload.bitrix,
              group: payload.group,
              substLevel: payload.substLevel,
              makeLogo: payload.makeLogo,
              brandAndCode: payload.brandAndCode,
              priceGroup: payload.priceGroup,
              priceGroupName: payload.priceGroupName
            }
          }
      )
    }
  },
  getters: {
    dataApi: state => {
      return state.data.api;
    },
    dataBitrix: state => {
      return state.data.bitrix;
    },
    searchCode: state => {
      return state.searchCode;
    },
  }
}