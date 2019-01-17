export default {
  state: {
    basketCountForId: {},
    excite: false
  },
  mutations: {
    setBasketCount(state, payload) {
      Object.assign(state.basketCountForId, payload);
    },
    setBasketIncrement(state, payload) {
      state.basketCountForId[payload.id].count += payload.count;
    },
    changeExcite(state) {
      state.excite = !state.excite;
    }
  },
  actions: {
    getIdProductFromRedis({dispatch, commit, state}, payload) {

      let {id, count, isBitrix} = payload;
      count = +count;

      dispatch('setParam', {id, basket: 'yes', count, isBitrix})
          .then(result => {
            if (result.statusText === 'OK') {
              if (state.basketCountForId[id]) {
                commit('setBasketIncrement', {id, count});
              } else {
                commit('setBasketCount', {[id]: {id, count}});
              }
            }
            commit('changeExcite');
          })
          .then(() => {
                BX.onCustomEvent("OnBasketChange");
              }
          ).catch(error => commit('setErrorMessage', true));
    },
  },
  getters: {
    basketCountForId: state => {
      return state.basketCountForId;
    },
    excite: state => {
      return state.excite;
    },
  }
}
