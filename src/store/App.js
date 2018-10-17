import axios from "axios";

export default {
  state: {
    manufacturer: '',
    count: 0,
    data: {},
  },
  mutations: {

    setManufacturer(state, payload) {
      state.manufacturer = payload.manufacturer
    },
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async getData({dispatch, commit}, payload) {
      const data = {bitrix: [], api: []};
      payload.bitrix = 'yes';
      await dispatch('setParam', payload).then(result => {
            data.bitrix = result.data;
            commit('setData', data);
          }
      ).catch(error => console.log(error));

      payload.bitrix = 'no';
      await dispatch('setParam', payload).then(result => {
            data.api = result.data;
            commit('setData', data);
          }
      ).catch(error => console.log(error));
    },

    async getDataDetail({dispatch, commit}, payload) {
      const data = {detail: []};
      payload.bitrix = 'no';

      await dispatch('setParam', payload).then(result => {
            data.detail = result.data;
            commit('setData', data);
          }
      ).catch(error => console.log(error));
    },

    setParam({}, payload) {
      return axios({
            method: "get",
            url: payload.url,
            params: {
              q: payload.searchCode,
              bitrix: payload.bitrix,
              group: 'yes',
              substLevel: payload.substLevel
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
    dataDetail: state => {
      return state.data.detail;
    },
  }
}