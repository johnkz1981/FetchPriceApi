export default {
  state: {
    manufacturer: '',
    apiSummaryLoading: false,
    apiPriceGroup: [],
    dataOriginal: [],
    dataRow: {},
    querySummaryTable: null,
    originalLoadingTable: false,
  },
  mutations: {
    setManufacturer(state, payload) {
      state.manufacturer = payload.manufacturer
    },
    setApiSummaryLoading(state, payload) {
      state.apiSummaryLoading = payload;
    },
    setApiPriceGroup(state, payload) {
      state.apiPriceGroup = payload;
    },
    setDataRow(state, payload) {
      state.dataRow = payload;
    },
    setDataOriginal(state, payload) {
      state.dataOriginal = payload;
    },
    setQuerySummaryTable(state, payload) {
      state.querySummaryTable = payload;
    },
    setOriginalLoadingTable(state, payload) {
      state.originalLoadingTable = payload;
    },
  },
  actions: {
    async getPriceGroup({dispatch, commit, state}, payload) {
      payload.substLevel = 'OriginalOnly';
      payload.makeLogo = payload.dataRow.makeLogo;
      payload.brandAndCode = payload.dataRow.brandAndCode;

      commit('setApiPriceGroup', []);
      commit('setApiSummaryLoading', true);
      commit('setDataRow', payload.dataRow);
      const objSummary = {
        brandAndCode: payload.dataRow.brandAndCode,
        makeLogo: payload.makeLogo,
        substLevel: payload.substLevel
      };
      commit('setQuerySummaryTable', objSummary);

      await dispatch('setParam', payload).then(result => {
            commit('setDataOriginal', result.data);
          }
      ).catch(error => console.log(error));

      payload.priceGroup = 'yes';
      payload.substLevel = 'All';
      delete payload.brandAndCode;

      await dispatch('setParam', payload).then(result => {
            commit('setApiPriceGroup', result.data.item);
            commit('setApiSummaryLoading', false);
          }
      ).catch(error => console.log(error));
    },
    getOriginal({dispatch, commit, state}, payload) {
      state.querySummaryTable.limit = payload.limit;
      commit('setOriginalLoadingTable', true);
      dispatch('setParam', state.querySummaryTable).then(result => {
            commit('setDataOriginal', result.data);
            commit('setOriginalLoadingTable', false);
          }
      ).catch(error => console.log(error));
    }
  },
  getters: {
    originalLoadingTable: state => {
      return state.originalLoadingTable;
    },
    apiSummaryLoading: state => {
      return state.apiSummaryLoading;
    },
    apiPriceGroup: state => {
      return state.apiPriceGroup;
    },
    dataRow: state => {
      return state.dataRow;
    },
    dataOriginal: state => {
      return state.dataOriginal;
    },
  }
}
