export default {
  state: {
    dataDetail: {},
  },
  mutations: {
    setDataDetail(state, payload) {
      Object.assign(state.dataDetail, payload);
    },
  },
  actions: {
    async getDataDetail({dispatch, commit, state}, payload) {
      payload.makeLogo = this.getters.dataRow.makeLogo;
      payload.substLevel = 'All';

      await dispatch('setParam', payload).then(result => {
            const data = {};

            data[payload.priceGroupName] = result.data;
            commit('setDataDetail', data);
          }
      ).catch(error => console.log(error));
    },
  },
  getters: {
    dataDetail: state => {
      return state.dataDetail;
    },
  }
}