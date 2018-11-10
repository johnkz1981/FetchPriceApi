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

      commit('setHideDetail', true);
      commit('setBottomPage', false);
      commit('setApiPriceGroup', []);
      commit('setData', data);
      commit('setSearchCode', payload.searchCode);
      commit('setBitrixLoading', true);

      await dispatch('setParam', payload).then(result => {
            data.bitrix = result.data;
            commit('setData', data);
            commit('setBitrixLoading', false);
            commit('setApiSummaryLoading', true);
          }
      ).catch(error => console.log(error));

      delete payload.bitrix;
      payload.group = 'yes';
      payload.substLevel = 'OriginalOnly';

      await dispatch('setParam', payload).then(result => {
            data.api = result.data;
            commit('setData', data);
            commit('setApiSummaryLoading', false);
          }
      ).catch(error => console.log(error));
    },
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