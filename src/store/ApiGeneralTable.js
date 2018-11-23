export default {
  state: {},
  mutations: {},
  actions: {
    addGeneralTable({dispatch, commit, state, getters}, payload) {
      if (payload.priceGroupName === 'Original') {
        payload.substLevel = 'OriginalOnly';
      } else {
        payload.substLevel = 'All';
      }
      payload.makeLogo = getters.querySummaryTable.makeLogo;

      const {sortBy, descending, page, rowsPerPage} = payload.pagination;

      payload.limit = rowsPerPage;
      payload.skipLimit = (page - 1) * rowsPerPage;
      payload.lazy = 'yes';
      payload.sortField = [sortBy, descending];

      commit('setApiGeneralTableLoading', true);
      dispatch('setParam', payload).then(result => {
            const arrItem = [];
            for (const key in result.data.item) {
              arrItem.push(result.data.item[key]);
            }
            commit('setPriceGroupObj', {[payload.priceGroupName]: {item: arrItem}});
            commit('setApiGeneralTableLoading', false);
          }
      ).catch(error => commit('setErrorMessage', true));
    }
  },
  getters: {}
}