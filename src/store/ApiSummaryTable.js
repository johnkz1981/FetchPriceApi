export default {
  state: {
    manufacturer: '',
    apiSummaryLoading: false,
    apiPriceGroup: [],
    makeLogo: '',
    dataDetail: {},
    dataOriginal: []
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
    setMakeLogo(state, payload) {
      state.makeLogo = payload;
    },
    setDataDetail(state, payload) {
      Object.assign(state.dataDetail, payload);
    },
    setDataOriginal(state, payload) {
      state.dataOriginal = payload;
    },
  },
  actions: {
    async getPriceGroup({dispatch, commit, state}, payload) {
      payload.bitrix = 'no';
      payload.group = 'no';
      payload.priceGroup = 'no';
      payload.substLevel = 'OriginalOnly';

      commit('setApiPriceGroup', []);
      commit('setApiSummaryLoading', true);
      commit('setMakeLogo', payload.makeLogo);

      await dispatch('setParam', payload).then(result => {
            console.log(result.data);
            commit('setDataOriginal', result.data);
          }
      ).catch(error => console.log(error));

      payload.priceGroup = 'yes';
      payload.substLevel = 'All';

      await dispatch('setParam', payload).then(result => {
            result.data.pop();
            commit('setApiPriceGroup', result.data);
            commit('setApiSummaryLoading', false);
          }
      ).catch(error => console.log(error));
    },
  },
  getters: {
    apiSummaryLoading: state => {
      return state.apiSummaryLoading;
    },
    apiPriceGroup: state => {
      return state.apiPriceGroup;
    },
    makeLogo: state => {
      return state.makeLogo;
    },
    dataDetail: state => {
      return state.dataDetail;
    },
    dataOriginal: state => {
      return state.dataOriginal;
    },
  }
}
